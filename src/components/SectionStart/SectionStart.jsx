import MyHeader from "./MyHeader/MyHeader.jsx";
import NotOnly from "./NotOnly/NotOnly.jsx";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import "./SectionStart.css";



export default function SectionStart() {
  const { user } = useContext(AuthContext);
  const mainPageLinks = [
    {
      className: "active",
      text: "About the shelter",
      link: "#",
    },
    {
      className: "interactive",
      text: "Our pets",
      link: "/second",
    },
    {
      className: "interactive",
      text: "FindYourFriend",
      link: "/search",
    },
    {
      className: "interactive",
      text: "Contacts",
      link: "#contacts",
    },
    {
      className: "interactive",
      text: user ? "Profile" : "Login",
      link: user ? "/profile" : "/login",
    },
  ];
  return (
    <div className="sectionStart">
      <MyHeader links={mainPageLinks}></MyHeader>
      <NotOnly></NotOnly>
    </div>
  );
}
