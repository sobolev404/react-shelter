import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    } catch (error) {
      console.error("Ошибка при загрузке данных пользователя:", error);
    } finally {
      setLoading(false);
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login,register, logout, fetchUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
