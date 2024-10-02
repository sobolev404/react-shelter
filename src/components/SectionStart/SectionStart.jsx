import MyHeader from "./MyHeader/MyHeader.jsx"
import NotOnly from "./NotOnly/NotOnly.jsx"
import './SectionStart.css'

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
  ];

export default function SectionStart(){
    return (
        <div className="sectionStart">
            <MyHeader links={mainPageLinks}></MyHeader>
            <NotOnly></NotOnly>
        </div>
    )
}