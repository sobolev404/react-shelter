import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import styles from "./EditUser.module.css";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
  const { user, logout, loading, fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  if (loading) {
    return <div>Loading...</div>; // Состояние загрузки
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Fullname:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p> {/* Пример для email, если он есть */}
          <button
            className={styles.button}
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}
