import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Burger from "../../Burger";
import "./MyHeader.css";

const burgerLinks = [
  {
    className: "active",
    text: "About the shelter",
    link: "/#",
  },
  {
    className: "interactive",
    text: "Our pets",
    link: "/second",
  },
  {
    className: "interactive",
    text: "Help the shelter",
    link: "/#help",
  },
  {
    className: "interactive",
    text: "Contacts",
    link: "/#contacts",
  },
];

export default function MyHeader({ customClass }) {
  const [menuActive, setMenuActive] = useState(false);

  const navRef = useRef(null);

  const closeBurger = () => {
    setMenuActive(false);
    document.body.classList.remove("_lock");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeBurger();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className={`header ${customClass}`}>
      <Link to="/">
        <div className="logo">
          <p className="logo-main">Cozy House</p>
          <p className="logo-sub">Shelter for pets in Boston</p>
        </div>
      </Link>

      <nav ref={navRef}>
        <Burger
          active={menuActive}
          onClick={() => {
            setMenuActive(!menuActive);
            document.body.classList.toggle("_lock");
            console.log(menuActive);
          }}
        ></Burger>
        <ul className={!menuActive ? "nav" : "nav _active"}>
          {burgerLinks.map((link) => (
            <li className={link.className} key={link.text}>
              <Link to={link.link} onClick={closeBurger}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
