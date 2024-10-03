import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import PetPopup from "./SectionFriends/PetPopup";
import PetCard from "./SectionFriends/PetCard";


export default function SectionProfile() {
  const [selectedPet, setSelectedPet] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Редирект на главную страницу
    }
  }, [user,navigate]);

  function openPopup(pet) {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(pet);
  }

  function closePopup() {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(null);
  }

  if (!user || !user.userPets) {
    return <div>Loading...</div>; // Показываем загрузку, если пользователь или питомцы отсутствуют
  }

  return (
    <>
      <h2>Your wishlist:</h2>
      <div className="user-pets">
        {user.userPets.length!==0 ? user.userPets.map((pet, idx) => (
          <PetCard
            onClick={() => {
              openPopup(pet);
            }}
            pet={pet}
            key={idx}
            imgUrl={pet.img}
            imgAlt={pet.name}
            petName={pet.name}
          ></PetCard>
        )): <p>You haven't add any pet yet...</p>}
        {selectedPet && (
          <div className="popup-container" onClick={closePopup}>
            <PetPopup pet={selectedPet} closePopup={closePopup} />
          </div>
        )}
      </div>
    </>
  );
}
