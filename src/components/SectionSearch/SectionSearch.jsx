import { useEffect, useRef, useState } from "react";
import PetCard from "../SectionFriends/PetCard.jsx";
import "./SectionSearch.css";
import PetPopup from "../SectionFriends/PetPopup.jsx";
import useFetching from "../../hooks/useFetching.js";

const sortOptions = ["name", "type", "breed", "age"];

export default function SectionSearch() {
  const [petsApi, setPetsApi] = useState([]);

  const [fetchPets, isPetsLoading, petsError] = useFetching(async () => {
    const response = await fetch(`http://localhost:4444/pets`);
    const data = await response.json();
    console.log(data);
    setPetsApi(data);
  });

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    if (petsApi.length > 0) {
      setCardArray(
        petsApi.map((pet, idx) => (
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
        ))
      );
    }
  }, [petsApi]);

  const [selectedPet, setSelectedPet] = useState(null);

  const [inputName, setInputName] = useState("");
  const [inputBreed, setInputBreed] = useState("");

  const [cardArray, setCardArray] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const inputNameRef = useRef(null);
  const inputBreedRef = useRef(null);
  function openPopup(pet) {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(pet);
  }

  function closePopup() {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(null);
  }

  useEffect(() => {
    setCardArray(searchByName(inputName, petsApi, "name"));
    console.log("render");
  }, [inputName]);

  useEffect(() => {
    setCardArray(searchByName(inputBreed, petsApi, "breed"));
    console.log("render");
  }, [inputBreed]);

  function searchByName(query, arr, searchCategory) {
    return arr
      .filter((item) =>
        item[searchCategory].toLowerCase().includes(query.toLowerCase())
      )
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

  function sortArr(opt, arr) {
    const sortedArray = [...arr].sort((a, b) => {
      if (typeof a[opt] === "string") {
        return a[opt].localeCompare(b[opt]);
      }
      return a[opt] - b[opt];
    });
    setCardArray(
      sortedArray.map((pet, idx) => (
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
      ))
    );
    console.log("sorted");
  }

  function handleSortOption(event) {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    sortArr(selectedOption, petsApi); // Используем новое значение напрямую
  }

  return (
    <div className="section-search">
      <div className="search-params">
        <div className="search-by-name">
          <h2>Search pet by name</h2>
          <input
            ref={inputNameRef}
            type="text"
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
        </div>
        <div className="search-by-name">
          <h2>Search pet by breed</h2>
          <input
            ref={inputBreedRef}
            type="text"
            onChange={(e) => setInputBreed(e.target.value)}
            value={inputBreed}
          />
        </div>
        <div className="search-sort">
          <h2>Sort by:</h2>
          <select onChange={handleSortOption}>
            <option>Sort by</option>
            {sortOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="section-search-pets">
        {!isPetsLoading ? cardArray : <p>Загрузка</p>}
      </div>
      {selectedPet && (
        <div className="popup-container" onClick={closePopup}>
          <PetPopup pet={selectedPet} closePopup={closePopup} />
        </div>
      )}
    </div>
  );
}
