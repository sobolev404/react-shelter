import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Импортируем useNavigate
import styles from "./AuthPages.module.css";

const RegisterPage = () => {
  const [fullName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [avatarUrl,setAvatarUrl] = useState("")
 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:4444/auth/register", {
      method: "POST", // Указываем метод запроса
      headers: {
        "Content-Type": "application/json", // Задаем тип содержимого, например, JSON
      },
      body: JSON.stringify({
        email,
        password,
        avatarUrl,
        fullName,
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={fullName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="text"
            placeholder="AvatarURL"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
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
          <Link className={styles.link} to='/login'>Already have an account? Login!</Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
