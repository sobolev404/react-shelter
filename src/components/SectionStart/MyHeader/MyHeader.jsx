import { useState, useRef, useEffect } from "react";
import Burger from "../../Burger";
import "./MyHeader.css";

const burgerLinks = [
  {
    className: "active",
    text: "About the shelter",
    link: "#",
  },
  {
    className: "interactive",
    text: "Our pets",
    link: "#",
  },
  {
    className: "interactive",
    text: "Help the shelter",
    link: "#help",
  },
  {
    className: "interactive",
    text: "Contacts",
    link: "#contacts",
  },
];

export default function MyHeader() {
  const [menuActive, setMenuActive] = useState(false);

  // Создаем рефы для бургер-кнопки и меню
  const burgerRef = useRef(null);
  const navRef = useRef(null);

  const handleLinkClick = () => {
    setMenuActive(false);
    document.body.classList.remove("_lock");
  };

  // Логика закрытия меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        burgerRef.current &&
        navRef.current &&
        !burgerRef.current.contains(event.target) &&
        !navRef.current.contains(event.target)
      ) {
        setMenuActive(false);
        document.body.classList.remove("_lock");
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <a href="#">
        <div className="logo">
          <p className="logo-main">Cozy House</p>
          <p className="logo-sub">Shelter for pets in Boston</p>
        </div>
      </a>

      <nav>
        <ul ref={navRef} className={!menuActive ? "nav" : "nav _active"}>
          {burgerLinks.map((link) => (
            <li className={link.className} key={link.text}>
              <a href={link.link} onClick={handleLinkClick}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <Burger
        ref={burgerRef}
        active={menuActive}
        onClick={() => {
          setMenuActive(!menuActive);
          document.body.classList.toggle("_lock");
          console.log(menuActive);
        }}
      ></Burger>
    </header>
  );
}
