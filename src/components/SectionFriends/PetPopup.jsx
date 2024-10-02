export default function PetPopup({ pet, closePopup }) {
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
      if (years > 0) result += " "; // добавить пробел, если есть и годы
      result += `${remainingMonths} ${monthsLabel}`;
    }
  
    return result || "0 months"; // если месяцев 0
  }
  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-content">
      <button className="popup-btn" onClick={closePopup}>
        &#x2715;
      </button>
      <img src={pet.img} alt={pet.name} className="popup-img" />
      <div className="popup-text">
        <h3 className="popup-name">{pet.name}</h3>
        <p className="popup-type">{convertMonthsToAge(pet.age)}</p>
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
