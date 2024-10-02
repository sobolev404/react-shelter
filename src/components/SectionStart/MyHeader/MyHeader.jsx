import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Burger from "../../Burger";
import "./MyHeader.css";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";



export default function MyHeader({ links,customClass }) {
  const [menuActive, setMenuActive] = useState(false);
  const { logout } = useContext(AuthContext);

  const {user} = useContext(AuthContext)

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

  const handleLinkClick = (event, link) => {
    if (link.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.getElementById(link.slice(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
      closeBurger();
  };
  

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
          }}
        ></Burger>
        <ul className={!menuActive ? "nav" : "nav _active"}>
          {links.map((link) => (
            <li className={link.className} key={link.text}>
              <Link to={link.link} onClick={(e) => handleLinkClick(e, link.link)}>
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
