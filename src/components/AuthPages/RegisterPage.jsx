import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import styles from "./AuthPages.module.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем текущий массив пользователей из localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Проверяем, существует ли пользователь с таким же именем пользователя
    const userExists = users.some((user) => user.username === username);

    if (userExists) {
      alert("Пользователь с таким именем уже существует!");
    } else {
      // Добавляем нового пользователя в массив
      const newUser = { username, password, userPets:[] };
      users.push(newUser);

      // Сохраняем обновленный массив обратно в localStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Автоматически логиним нового пользователя
      login(newUser);
      navigate("/");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
