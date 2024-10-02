// src/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Создаем контекст
export const AuthContext = createContext();

// Создаем провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Извлекаем пользователя из localStorage при монтировании
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Устанавливаем пользователя в состояние
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Сохраняем пользователя в localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Удаляем пользователя из localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
