export default function PetPopup({ pet, closePopup }) {
  return (
    <div className="popup-content">
      <button className="popup-btn" onClick={closePopup}>
        &#x2715;
      </button>
      <img src={pet.img} alt={pet.name} className="popup-img" />
      <div className="popup-text">
        <h3 className="popup-name">{pet.name}</h3>
        <p className="popup-type">{pet.breed}</p>
        <p className="popup-desc">{pet.description}</p>
        <ul className="popup-qualities">
            <li><b>Inoculations:</b>{pet.inoculations.join(", ")}</li>
            <li><b>Diseases:</b>{pet.diseases.join(", ")}</li>
            <li><b>Parasites:</b>{pet.parasites.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
}
