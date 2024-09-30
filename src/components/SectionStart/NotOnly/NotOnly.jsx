import "./NotOnly.css";
import puppyImage from "../../../assets/img/start-screen-puppy.png";
import { Link } from "react-router-dom";

export default function NotOnly() {
  const linkToFriendsSection = '#friends'
  return (
    <div className="notOnly">
      <div className="notOnly-block">
        <h1>Not only people need a house</h1>
        <p>
          We offer to give a chance to a little and nice puppy with an extremely
          wide and open heart. He or she will love you more than anybody else in
          the world, you will see!
        </p>
        <Link
          to={linkToFriendsSection}
          onClick={(event) => {
            event.preventDefault();
            const targetElement = document.getElementById(linkToFriendsSection.slice(1));
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Make a friend
        </Link>
      </div>

      <img className="notOnly-img" src={puppyImage} alt="puppy" />
    </div>
  );
}
