import SectionFooter from "../SectionFooter/SectionFooter";
import SectionSearch from "../SectionSearch/SectionSearch";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
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
  ];


export default function SearchPage(){
    return (
        <>
        <MyHeader links={searchPageLinks} customClass={'second-page-header'}></MyHeader>
        <SectionSearch></SectionSearch>
        <SectionFooter></SectionFooter>
        </>
    )
}