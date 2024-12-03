import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom"; 
import styles from "./AuthPages.module.css";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [avatarUrl,setAvatarUrl] = useState("")
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, fullName, avatarUrl);
    } catch (error) {
      console.error("Ошибка регистрации:", error); 
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
