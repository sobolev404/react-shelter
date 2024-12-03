import { forwardRef, useContext, useState } from "react";
import styles from "./AddNewPet.module.css";
import { AuthContext } from "../AuthContext";


export default function AddNewPet() {
  const {fetchPets} = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    petImg: "",
    petType: "",
    petBreed: "",
    petDesc: "",
    petAge: "",
    petInoculations: "",
    petDiseases: "",
    petParasites: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: formData.name,
      img: formData.petImg,
      type: formData.petType,
      breed: formData.petBreed,
      description: formData.petDesc,
      age: Number(formData.petAge), // Преобразование в число
      inoculations: (formData.petInoculations) ? formData.petInoculations
        .split(",")
        .map((str) => str.trim()) : [],
      diseases: (formData.petDiseases) ? formData.petDiseases.split(",").map((str) => str.trim()): [],
      parasites: (formData.petParasites) ? formData.petParasites.split(",").map((str) => str.trim()): [],
    };

    try {
      const response = await fetch("http://localhost:4444/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Питомец добавлен:", data);
        setIsEditing(false);
        setFormData({
          name: "",
          petImg: "",
          petType: "",
          petBreed: "",
          petDesc: "",
          petAge: "",
          petInoculations: '',
          petDiseases: '',
          petParasites: '',
        });
        fetchPets()
      } else {
        console.error("Ошибка при добавлении питомца");
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
    }
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Add a new pet</h2>
      {
        <>
          {!isEditing ? (
            <div className={styles.btns}>
              <button
                className={styles.button}
                onClick={() => setIsEditing(true)}
              >
                Add pet
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Pet image:
                <input
                  type="text"
                  name="petImg"
                  value={formData.petImg}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Type (dog/cat/etc):
                <input
                  type="text"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Breed:
                <input
                  type="text"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Description:
                <input
                  type="text"
                  name="petDesc"
                  value={formData.petDesc}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Age (months):
                <input
                  type="number"
                  name="petAge"
                  value={formData.petAge}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </label>
              <label className={styles.label}>
                Inoculations (not required):
                <input
                  type="text"
                  name="petInoculations"
                  value={formData.petInoculations}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Diseases (not required):
                <input
                  type="text"
                  name="petDiseases"
                  value={formData.petDiseases}
                  onChange={handleChange}
                  className={styles.input}
                />
              </label>
              <label className={styles.label}>
                Parasites (not required):
                <input
                  type="text"
                  name="petParasites"
                  value={formData.petParasites}
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
      }
    </div>
  );
}
