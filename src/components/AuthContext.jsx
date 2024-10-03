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

  const removePetFromUser = (pet) => {
    if (user) {
      setUser((prevUser) => {
        const updatedUserPets = prevUser.userPets.filter(
          (_, index) => index !== prevUser.userPets.indexOf(pet)
        );
  
        // Обновляем состояние пользователя
        const updatedUser = { ...prevUser, userPets: updatedUserPets };
  
        // Сразу обновляем localStorage с новым состоянием
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.username === user.username
            ? { ...u, userPets: updatedUserPets }
            : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
  
        // Возвращаем новое состояние для setUser
        return updatedUser;
      });
    }
  };


  const updateUser = (newUsername, newPassword) => {
    setUser((prevUser) => ({
      ...prevUser,
      username: newUsername,
      ...(newPassword && { password: newPassword }), // Обновляем пароль, если он не пустой
    }));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username
        ? { ...u, username: newUsername, ...(newPassword && { password: newPassword }) }
        : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addPetToUser,removePetFromUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
