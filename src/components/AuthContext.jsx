import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addPetToUser = (pet) => {
    if (user) {
      setUser((prevUser) => ({
        ...prevUser,
        userPets: [...prevUser.userPets, pet],
      }));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.username === user.username
          ? { ...u, userPets: [...u.userPets, pet] }
          : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addPetToUser }}>
      {children}
    </AuthContext.Provider>
  );
};
