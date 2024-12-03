import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [petsApi, setPetsApi] = useState([]);

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setLoading(false); 
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
      setUserPets(userData.favoritePets);
      setAdoptedPets(userData.adoptedPets);
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await fetch("http://localhost:4444/pets");
      const data = await response.json();
      setPetsApi(data);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
    }
  };

  const fetchUserPets = async () => {
    try {
      const response = await fetch(`http://localhost:4444/favPetsList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }), 
      });

      if (response.ok) {
        const data = await response.json();
        setUserPets((prev) => ({ ...prev, favoritePets: data.favoritePets }));
      } else {
        alert("Failed to fetch favorite pets");
      }
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    }
  };

  const fetchAdoptedPets = async () => {
    try {
      const response = await fetch(`http://localhost:4444/adoptedPetsList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id }), 
      });

      if (response.ok) {
        const data = await response.json();
        setAdoptedPets((prev) => ({ ...prev, adoptedPets: data.adoptedPets }));
      } else {
        alert("Failed to fetch adopted pets");
      }
    } catch (error) {
      console.error("Error fetching adopted pets:", error);
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

      setUser(data);
      setAdoptedPets(data.adoptedPets)
      setUserPets(data.favoritePets)
      localStorage.setItem("token", data.token);
      navigate("/");
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

      const data = await response.json();
  
      if (!response.ok) {
        if (data.errors) {
          alert(data.errors.join("\n"));
        } else {
          throw new Error(data.message || "Registration failed");
        }
        return;
      }
      setAdoptedPets(data.adoptedPets)
      setUserPets(data.favoritePets)
      setUser(data);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      throw error;
    }
  };

  const addPetToUser = async (pet) => {
    try {
      const response = await fetch(`http://localhost:4444/favourites`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user._id, petId: pet._id }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was added to your wishlist`);
        setUserPets(data.user.favoritePets);
        fetchPets();
      } else {
        const error = await response.json();
        alert(`Failed to add pet to wishlist: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding pet to wishlist:", error);
      alert("An error occurred while adding the pet to your wishlist.");
    }
  };

  const removePetFromUser = async (pet) => {
    try {
      const response = await fetch(`http://localhost:4444/favourites/remove`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          petId: pet._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} was removed from your wishlist`);
        setUserPets(data.user.favoritePets);
        fetchPets();
      } else {
        alert("Failed to remove pet from wishlist.");
      }
    } catch (error) {
      console.error("Error removing pet from wishlist:", error);
      alert("An error occurred while removing the pet from your wishlist.");
    }
  };

  const addAdoptedPet = async (pet) => {
    try {
      const response = await fetch(`http://localhost:4444/adopt`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          petId: pet._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`${pet.name} has been successfully adopted`);
        setAdoptedPets(data.user.adoptedPets);
        fetchPets();
        setUserPets(data.user.favoritePets)
      } else {
        const error = await response.json();
        alert(`Failed to adopt pet: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adopting pet:", error);
      alert("An error occurred while adopting the pet.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        fetchUserData,
        loading,
        addPetToUser,
        removePetFromUser,
        userPets,
        setUserPets,
        fetchPets, 
        petsApi,
        addAdoptedPet,
        adoptedPets,
        fetchAdoptedPets,
        fetchUserPets,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
