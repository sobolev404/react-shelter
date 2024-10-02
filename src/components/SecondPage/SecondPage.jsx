import SectionFooter from "../SectionFooter/SectionFooter";
import SectionFriends from "../SectionFriends/SectionFriends";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

import './SecondPage.css'

export default function SecondPage(){
  const { user } = useContext(AuthContext);
  const secondPageLinks = [
    {
      className: "interactive",
      text: "About the shelter",
      link: "/",
    },
    {
      className: "active",
      text: "Our pets",
      link: "#",
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
    <>
        <MyHeader links={secondPageLinks} customClass={'second-page-header'}></MyHeader>
        <SectionFriends useNavigation={false} usePagination={true} customClass={'pagination'}></SectionFriends>
        <SectionFooter></SectionFooter>
    </>
  );
};
