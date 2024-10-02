import { useEffect, useRef, useState } from "react";
import PetCard from "../SectionFriends/PetCard.jsx";
import { pets } from "../SectionFriends/SectionFriends.jsx";
import "./SectionSearch.css";
import PetPopup from "../SectionFriends/PetPopup.jsx";

export default function SectionSearch() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [value, setValue] = useState("");
  const [cardArray, setCardArray] = useState([]);

  const inputRef = useRef(null);

  function openPopup(pet) {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(pet);
  }

  function closePopup() {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(null);
  }

  useEffect(() => {
    setCardArray(searchByName(value, pets));
  }, [value]);

  function searchByName(query, arr) {
    return arr
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .map((pet, idx) => (
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
      ));
  }

  return (
    <div className="section-search">
      <div className="search-params">
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div className="section-search-pets">
        {cardArray.length > 0 ? (
          cardArray 
        ) : (
          <p>Животное с таким именем не найдено</p>
        )}
      </div>
      {selectedPet && (
        <div className="popup-container" onClick={closePopup}>
          <PetPopup pet={selectedPet} closePopup={closePopup} />
        </div>
      )}
    </div>
  );
}
