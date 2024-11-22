import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import PetPopup from "../SectionFriends/PetPopup";
import styles from "./AdoptedPets.module.css";

export default function AdoptedPets() {
  const [selectedPet, setSelectedPet] = useState(null);
  const { user, adoptedPets, fetchAdoptedPets } = useContext(AuthContext); // Используем контекст
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Перенаправляем на главную страницу, если пользователь не авторизован
    }
  }, [user, navigate]);

  if (!user || !adoptedPets) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adopted Pets:</h1>
      {adoptedPets.length !== 0 ? (
        <div className={styles.list}>
          {adoptedPets.map((item, index) => (
            <div
              key={index}
              className={styles.card}
            >
              <img
                className={styles.image}
                src={item.img}
                alt={item.name}
              />
              <p className={styles.name}>{item.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noPets}>You haven't adopted any pets yet...</p>
      )}

    </div>
  );
}
