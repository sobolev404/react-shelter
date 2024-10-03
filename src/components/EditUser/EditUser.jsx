import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext";
import styles from "./EditUser.module.css"; // Импортируем CSS-модуль
import { useNavigate } from "react-router-dom";
export default function EditUser() {
    const { user, updateUser, logout } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: user.username,
        password: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate()

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        updateUser(formData.username, formData.password);
        setIsEditing(false);
        setFormData((prevData) => ({
            ...prevData,
            password: ""
        }));
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Username: {user.username}</h2>
            {!isEditing ? (<>
                <button className={styles.button} onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button className={styles.button} onClick={()=>{
                    logout()
                    navigate('/')
                }}>Logout</button>
            </>
                

            ) : (
                <form onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        New Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
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
                    <button type="submit" className={styles.button}>Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className={`${styles.button} ${styles.cancel}`}>Cancel</button>
                </form>
            )}
        </div>
    );
}
