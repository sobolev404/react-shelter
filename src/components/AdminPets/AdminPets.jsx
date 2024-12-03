import React, { useState, useContext, useEffect } from "react";
import styles from "./AdminPets.module.css";
import { AuthContext } from "../AuthContext";

function AdminPets() {
  const { petsApi, fetchPets } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const openEditModal = (pet) => {
    setEditingPet(pet);
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setEditingPet(null);
    setModalVisible(false);
  };

  useEffect(()=>fetchPets,[])

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4444/pets/${editingPet._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPet),
        }
      );

      if (response.ok) {
        alert("Данные питомца обновлены!");
        fetchPets();
        closeEditModal();
      } else {
        alert("Не удалось обновить данные питомца.");
      }
    } catch (error) {
      console.error("Ошибка обновления:", error);
      alert("Что-то пошло не так...");
    }
  };

  const handleDelete = async (petId) => {
    try {
      const response = await fetch(
        `http://localhost:4444/pets/${petId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Питомец удален.");
        fetchPets();
      } else {
        alert("Не удалось удалить питомца.");
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      alert("Что-то пошло не так...");
    }
  };

  const renderPetCard = (item) => (
    <div className={styles.card} key={item._id}>
      <img className={styles.image} src={item.img} alt={item.name} />
      <div className={styles.petDesc}>
        <p>{item.name}</p>
        <p>{item.breed}</p>
      </div>
      <div className={styles.btns}>
        <button className={styles.btnCont} onClick={() => openEditModal(item)}>
          ✏️
        </button>
        <button
          className={styles.btnCont}
          onClick={() =>
            window.confirm("Удалить питомца?") && handleDelete(item._id)
          }
        >
          ❌
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      <div className={styles.cardList}>
        {petsApi.map((pet) => renderPetCard(pet))}
      </div>

      {isModalVisible && editingPet && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>Редактировать питомца</h2>
            <input
              className={styles.input}
              placeholder="Имя"
              value={editingPet.name}
              onChange={(e) =>
                setEditingPet({ ...editingPet, name: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="URL изображения"
              value={editingPet.img}
              onChange={(e) =>
                setEditingPet({ ...editingPet, img: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Тип"
              value={editingPet.type}
              onChange={(e) =>
                setEditingPet({ ...editingPet, type: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Порода"
              value={editingPet.breed}
              onChange={(e) =>
                setEditingPet({ ...editingPet, breed: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Описание"
              value={editingPet.description}
              onChange={(e) =>
                setEditingPet({ ...editingPet, description: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Возраст"
              type="number"
              value={editingPet.age || 0}
              onChange={(e) =>
                setEditingPet({
                  ...editingPet,
                  age: parseInt(e.target.value, 10) || 0,
                })
              }
            />
            <input
              className={styles.input}
              placeholder="Прививки"
              value={editingPet.inoculations}
              onChange={(e) =>
                setEditingPet({ ...editingPet, inoculations: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Заболевания"
              value={editingPet.diseases}
              onChange={(e) =>
                setEditingPet({ ...editingPet, diseases: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder="Паразиты"
              value={editingPet.parasites}
              onChange={(e) =>
                setEditingPet({ ...editingPet, parasites: e.target.value })
              }
            />
            <div className={styles.modalButtons}>
              <button onClick={handleUpdate}>Сохранить</button>
              <button className={styles.cancelBtn} onClick={closeEditModal}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPets;
