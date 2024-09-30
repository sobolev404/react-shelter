import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./SectionFriends.css";

import jen from "../../assets/img/pets-jennifer.png";
import sophia from "../../assets/img/pets-sophia.png";
import woody from "../../assets/img/pets-woody.png";
import scarlet from "../../assets/img/pets-scarlet.png";
import katrine from "../../assets/img/pets-katrine.png";
import timmy from "../../assets/img/pets-timmy.png";
import charly from "../../assets/img/pets-charly.png";
import freddie from "../../assets/img/pets-freddie.png";
import PetCard from "./PetCard";
import PetPopup from "./PetPopup";
import { Link } from "react-router-dom";

export default function SectionFriends() {
  const pets = [
    {
      name: "Jennifer",
      img: jen,
      type: "Dog",
      breed: "Labrador",
      description:
        "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      age: "2 months",
      inoculations: ["none"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Sophia",
      img: sophia,
      type: "Dog",
      breed: "Shih tzu",
      description:
        "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      age: "1 month",
      inoculations: ["parvovirus"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Woody",
      img: woody,
      type: "Dog",
      breed: "Golden Retriever",
      description:
        "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      age: "3 years 6 months",
      inoculations: ["adenovirus", "distemper"],
      diseases: ["right back leg mobility reduced"],
      parasites: ["none"],
    },
    {
      name: "Scarlett",
      img: scarlet,
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      age: "3 months",
      inoculations: ["parainfluenza"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Katrine",
      img: katrine,
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      age: "6 months",
      inoculations: ["panleukopenia"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Timmy",
      img: timmy,
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      age: "2 years 3 months",
      inoculations: ["calicivirus", "viral rhinotracheitis"],
      diseases: ["kidney stones"],
      parasites: ["none"],
    },
    {
      name: "Katrine",
      img: katrine,
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      age: "6 months",
      inoculations: ["panleukopenia"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Freddie",
      img: freddie,
      type: "Cat",
      breed: "British Shorthair",
      description:
        "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      age: "2 months",
      inoculations: ["rabies"],
      diseases: ["none"],
      parasites: ["none"],
    },
    {
      name: "Charly",
      img: charly,
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
    {
      name: "Charly",
      img: charly,
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
    {
      name: "Charly",
      img: charly,
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
    {
      name: "Charly",
      img: charly,
      type: "Dog",
      breed: "Jack Russell Terrier",
      description:
        "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
  ];

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

  const updateSlides = () => {
    let cards = [];

    if (window.innerWidth < 768) {
      cards = splitArray(pets, pets.length);
    } else if (window.innerWidth < 1280) {
      cards = splitArray(pets, 6);
    } else {
      cards = splitArray(pets, 4);
    }

    setFinalCards(cards);
  };

  useEffect(() => {
    updateSlides();

    const handleResize = () => updateSlides();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="wrapper-friends">
      <section className="friends-sec content">
        <div id="friends" className="friends">
          <h2 className="friends-title">
            Our friends who
            <br />
            are looking for a house
          </h2>
          <div className="slider">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
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
          <Link to='/second'>Get to know the rest</Link>
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
