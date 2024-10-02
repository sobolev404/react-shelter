import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import PetPopup from "./SectionFriends/PetPopup";
import PetCard from "./SectionFriends/PetCard";


export default function SectionProfile() {
  const [selectedPet, setSelectedPet] = useState(null);
  const { user } = useContext(AuthContext);

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
      <h2>{user.username}</h2>
      <div>
        {user.userPets.map((pet, idx) => (
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
        ))}
        {selectedPet && (
          <div className="popup-container" onClick={closePopup}>
            <PetPopup pet={selectedPet} closePopup={closePopup} />
          </div>
        )}
      </div>
    </>
  );
}
