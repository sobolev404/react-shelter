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
      className: "active",
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


export default function SearchPage(){
    return (
        <>
        <MyHeader links={searchPageLinks} customClass={'second-page-header'}></MyHeader>
        <SectionSearch></SectionSearch>
        <SectionFooter></SectionFooter>
        </>
    )
}