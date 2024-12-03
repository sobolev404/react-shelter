import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useLocation } from "react-router-dom";

export default function PetPopup({ pet, closePopup }) {
  const location = useLocation();

  const { user, addPetToUser, removePetFromUser, addAdoptedPet } =
    useContext(AuthContext);

  function convertMonthsToAge(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const yearsLabel = years > 1 ? "years" : "year";
    const monthsLabel = remainingMonths > 1 ? "months" : "month";

    let result = "";
    if (years > 0) {
      result += `${years} ${yearsLabel}`;
    }

    if (remainingMonths > 0) {
      if (years > 0) result += " "; 
      result += `${remainingMonths} ${monthsLabel}`;
    }

    return result || "0 months"; 
  }

  const handleAddToFavorites = () => {
    addPetToUser(pet);
    closePopup();
  };

  const handleRemoveFromFavorites = () => {
    removePetFromUser(pet);
    closePopup();
  };

  const handleAddAdoptedPet = () => {
    addAdoptedPet(pet);
    closePopup();
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-content">
      <div className="popup-top">
        <img src={pet.img} alt={pet.name} className="popup-img" />
        <div className="popup-text">
          <h3 className="popup-name">{pet.name}</h3>
          <p className="popup-type">{convertMonthsToAge(pet.age)}</p>
          <p className="popup-type">{pet.breed}</p>
          <p className="popup-desc">{pet.description}</p>
          <ul className="popup-qualities">
            <li>
              <b>Inoculations:</b>
              {pet.inoculations.join(", ")}
            </li>
            <li>
              <b>Diseases:</b>
              {pet.diseases.join(", ")}
            </li>
            <li>
              <b>Parasites:</b>
              {pet.parasites.join(", ")}
            </li>
          </ul>
        </div>
      </div>
      <button className="popup-btn" onClick={closePopup}>
        &#x2715;
      </button>
      {user && location.pathname !== "/profile" && (
        <button
          className="popup-btn-add"
          onClick={() => {
            handleAddToFavorites();
            alert(`${pet.name} was added to your wishlist`);
          }}
        >
          Add to a wishlist
        </button>
      )}
      {user && location.pathname === "/profile" && (
        <button
          className="popup-btn-add popup-btn-delete"
          onClick={() => {
            handleRemoveFromFavorites();
            alert(`${pet.name} was removed from your wishlist`);
          }}
        >
          Remove from a wishlist
        </button>
      )}
      {user && location.pathname === "/profile" && (
        <button
          className="popup-btn-add"
          onClick={() => {
            handleAddAdoptedPet();
            alert(`${pet.name} was adopted`);
          }}
        >Take to home</button>
      )}
    </div>
  );
}
