import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { AuthContext } from "../AuthContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SectionFriends.css";

import PetCard from "./PetCard";
import PetPopup from "./PetPopup";
import { Link } from "react-router-dom";
import useFetching from "../../hooks/useFetching";

export default function SectionFriends({
  useNavigation,
  usePagination,
  customClass,
}) {
 
  useEffect(() => {
    fetchPets();
  }, []);

  const { petsApi,fetchPets } = useContext(AuthContext);

  const [finalCards, setFinalCards] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);

  const openPopup = (pet) => {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(pet); // Открываем попап с выбранным питомцем
  };

  const closePopup = () => {
    document.body.classList.toggle("stop-scroll");
    setSelectedPet(null); // Закрываем попап
  };

  const splitArray = (arr, parts) => {
    const result = [];
    let chunkSize = Math.ceil(arr.length / parts);
    for (let i = 0; i < parts; i++) {
      result.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return result;
  };

  const updateSlidesNavigation = () => {
    let cards = [];

    if (window.innerWidth < 768) {
      cards = splitArray(petsApi, petsApi.length);
    } else if (window.innerWidth < 1280) {
      cards = splitArray(petsApi, petsApi.length / 2);
    } else {
      cards = splitArray(petsApi, petsApi.length / 3);
    }
    console.log(cards);
    setFinalCards(cards);
  };

  const updateSlidesPagination = () => {
    let cards = [];

    if (window.innerWidth < 768) {
      cards = splitArray(petsApi, petsApi.length);
    } else if (window.innerWidth < 1280) {
      cards = splitArray(petsApi, petsApi.length/2);
    } else {
      cards = splitArray(petsApi, petsApi.length/3);
    }

    setFinalCards(cards);
  };
  const updateSlides = useNavigation
    ? updateSlidesNavigation
    : updateSlidesPagination;
  useEffect(() => {
    updateSlides();

    const handleResize = () => updateSlides();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [petsApi]);

  return (
    <div className="wrapper-friends">
      <section className="friends-sec content">
        <div id="friends" className="friends">
          <h2 className="friends-title">
            Our friends who
            <br />
            are looking for a house
          </h2>
          <div className={`slider ${customClass}`}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={useNavigation}
              pagination={
                usePagination && {
                  clickable: true,
                  dynamicBullets: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className}">${index + 1}</span>`;
                  },
                }
              }
              loop
            >
              {finalCards.map((group, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide">
                    {group.map((pet, idx) => (
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          {useNavigation && <Link to="/second">Get to know the rest</Link>}
        </div>
        {selectedPet && (
          <div className="popup-container" onClick={closePopup}>
            <PetPopup pet={selectedPet} closePopup={closePopup} />
          </div>
        )}
      </section>
    </div>
  );
}
