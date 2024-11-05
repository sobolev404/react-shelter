import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Импортируем useNavigate
import styles from "./AuthPages.module.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4444/auth/login", {
      method: "POST", // Указываем метод запроса
      headers: {
        "Content-Type": "application/json", // Задаем тип содержимого, например, JSON
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети");
        }
        return response.json(); // Преобразуем ответ в JSON
      })
      .then((data) => {
        console.log("Ответ:", data); // Обрабатываем полученные данные
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error); // Обрабатываем ошибки
      });

  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
          <Link className={styles.link} to='/register'>Don't have an account? Register!</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
