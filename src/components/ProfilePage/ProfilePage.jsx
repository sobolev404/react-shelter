import SectionFooter from "../SectionFooter/SectionFooter";
import SectionProfile from "../SectionProfile";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import './ProfilePage.css'

export default function ProfilePage() {
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
            className: "active",
            text: "Profile",
            link: "#",
          },
      ];  
  return (
    <>
      <MyHeader
        links={searchPageLinks}
        customClass={"second-page-header"}
      ></MyHeader>
      <SectionProfile></SectionProfile>
      <SectionFooter></SectionFooter>
    </>
  );
}
