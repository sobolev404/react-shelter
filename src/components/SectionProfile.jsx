import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import PetPopup from "./SectionFriends/PetPopup";
import PetCard from "./SectionFriends/PetCard";

export default function FavPets() {
  const [selectedPet, setSelectedPet] = useState(null);
  const {user,userPets} = useContext(AuthContext); // Используем контекст
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Редирект на главную страницу, если пользователя нет
    }
  }, [user, navigate]);

  // Открытие попапа с информацией о питомце
  function openPopup(pet) {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(pet);
  }

  // Закрытие попапа
  function closePopup() {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(null);
  }

  if (!user || !userPets) {
    return <div>Loading...</div>; // Показываем загрузку, если пользователь или питомцы отсутствуют
  }

  return (
    <>
      <h2>Your wishlist:</h2>
      <div className="user-pets">
        {userPets.length !== 0 ? (
          userPets.map((pet, idx) => (
            <PetCard
              onClick={() => openPopup(pet)} // Открытие попапа при клике
              pet={pet}
              key={idx}
              imgUrl={pet.img}
              imgAlt={pet.name}
              petName={pet.name}
            />
          ))
        ) : (
          <p>You haven't added any pets yet...</p> // Если нет питомцев в избранном
        )}

        {selectedPet && (
          <div className="popup-container" onClick={closePopup}>
            <PetPopup pet={selectedPet} closePopup={closePopup} />
          </div>
        )}
      </div>
    </>
  );
}
