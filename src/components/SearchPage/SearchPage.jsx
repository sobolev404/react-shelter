import SectionFooter from "../SectionFooter/SectionFooter";
import SectionSearch from "../SectionSearch/SectionSearch";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

export default function SearchPage() {
  const { user } = useContext(AuthContext);

  const searchPageLinks = [
    {
      className: "interactive",
      text: "About the shelter",
      link: "/",
    },
    {
      className: "inreractive",
      text: "Our pets",
      link: "/second",
    },
    {
      className: "active",
      text: "FindYourFriend",
      link: "#",
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
      <MyHeader
        links={searchPageLinks}
        customClass={"second-page-header"}
      ></MyHeader>
      <SectionSearch></SectionSearch>
      <SectionFooter></SectionFooter>
    </>
  );
}
