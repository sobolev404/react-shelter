import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import styles from "./EditUser.module.css";
import { useNavigate } from "react-router-dom";

export default function EditUser() {
  const { user, logout, loading, fetchUserData, token } =
    useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    avatarUrl: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUserData();
    } else {
      setFormData({
        fullName: user.fullName || "",
        avatarUrl: user.avatarUrl || "",
        password: "",
      });
    }
  }, [user, fetchUserData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4444/auth/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          avatarUrl: formData.avatarUrl,
          password: formData.password || undefined, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      fetchUserData();
      setIsEditing(false);
      setFormData((prevData) => ({
        ...prevData,
        password: "",
      }));
    } catch (err) {
      console.error("Error updating user:", err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>{!user.isAdmin ? 'User Profile' : 'Admin Profile'}</h2>
      {user ? (
        <>
          {!isEditing ? (
            <div>
              <p>
                <strong>Fullname:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <div className={styles.btns}>
                <button
                  className={styles.button}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
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
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>
                New Fullname:
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                New AvatarURL:
                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                New Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <button type="submit" className={styles.button}>
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`${styles.button} ${styles.cancel}`}
              >
                Cancel
              </button>
            </form>
          )}
        </>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}
