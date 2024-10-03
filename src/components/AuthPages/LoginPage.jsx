import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Импортируем useNavigate
import styles from "./AuthPages.module.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Инициализируем хук useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Получаем массив пользователей из localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Ищем пользователя с соответствующим именем и паролем
    const storedUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (storedUser) {
      // Входим в систему
      login(storedUser);
      navigate("/");
    } else {
      alert("Неправильное имя пользователя или пароль");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
