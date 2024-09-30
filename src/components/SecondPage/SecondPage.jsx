import SectionFooter from "../SectionFooter/SectionFooter";
import SectionFriends from "../SectionFriends/SectionFriends";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import './SecondPage.css'

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
    text: "Help the shelter",
    link: "#help",
  },
  {
    className: "interactive",
    text: "Contacts",
    link: "#contacts",
  },
];

export default function SecondPage(){
  return (
    <>
        <MyHeader links={secondPageLinks} customClass={'second-page-header'}></MyHeader>
        <SectionFriends useNavigation={false} usePagination={true} customClass={'pagination'}></SectionFriends>
        <SectionFooter></SectionFooter>
    </>
  );
};
