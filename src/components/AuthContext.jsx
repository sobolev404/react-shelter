import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPets,setUserPets] = useState([])
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false); // Устанавливаем загрузку в false, если токен отсутствует
    }
  }, [token]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4444/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Не удалось получить данные пользователя");
      }

      const userData = await response.json();
      setUser(userData);
      // Получаем питомцев пользователя при загрузке данных
      fetchUserPets(userData.favoritePets);
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    } finally {
      setLoading(false);
    }
  };

  // Функция для получения питомцев пользователя
  const fetchUserPets = async (favoritePets) => {
    try {
      const petPromises = favoritePets.map((petId) =>
        fetch(`http://localhost:4444/pets/${petId}`).then((res) => res.json())
      );
      const pets = await Promise.all(petPromises);
      setUserPets(pets);
    } catch (error) {
      console.error("Ошибка при загрузке питомцев:", error);
    }
  };


  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:4444/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа");
      }

      setUser(data); // сохраняем данные пользователя и токен
      localStorage.setItem("token", data.token); // сохраняем токен в localStorage
      navigate("/"); // перенаправление на главную страницу
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (email, password, fullName, avatarUrl) => {
    try {
      const response = await fetch("http://localhost:4444/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullName, avatarUrl }),
      });

      if (!response.ok) {
        throw new Error("Ошибка регистрации");
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Ошибка входа");
      }

      setUser(data); // сохраняем данные пользователя и токен
      localStorage.setItem("token", data.token); // сохраняем токен в localStorage
      navigate("/"); // перенаправление на главную страницу
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  };

  const addPetToUser = async (pet) => {
    try {
      const response = await fetch("http://localhost:4444/favourites", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // передаем токен пользователя
        },
        body: JSON.stringify({ petId: pet._id, userId: user._id }),  // отправляем ID питомца
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was added to your wishlist`);
        setUserPets((prevPets) => [...prevPets, pet]);
        // Обновляем данные пользователя на фронте (если нужно)
      } else {
        alert("Failed to add pet to wishlist.");
      }
    } catch (error) {
      console.error("Error adding pet to wishlist:", error);
      alert("An error occurred while adding the pet to your wishlist.");
    }
  };

  const removePetFromUser = async (pet) => {
    try {
      const response = await fetch("http://localhost:4444/favourites/remove", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ petId: pet._id, userId: user._id }),  // отправляем ID питомца
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was removed from your wishlist`);
        setUserPets((prevPets) => prevPets.filter((p) => p._id !== pet._id)); // Удаляем питомца из списка
        // Обновляем данные пользователя на фронте (если нужно)
      } else {
        alert("Failed to remove pet from wishlist.");
      }
    } catch (error) {
      console.error("Error removing pet from wishlist:", error);
      alert("An error occurred while removing the pet from your wishlist.");
    }
  };
  
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login,register, logout, fetchUserData, loading,addPetToUser,removePetFromUser,userPets,setUserPets }}>
      {children}
    </AuthContext.Provider>
  );
};
