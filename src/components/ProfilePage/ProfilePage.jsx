import AddNewPet from "../AddNewPet/AddNewPet";
import AdminPets from "../AdminPets/AdminPets";
import AdoptedPets from "../AdoptedPets/AdoptedPets";
import EditUser from "../EditUser/EditUser";
import SectionFooter from "../SectionFooter/SectionFooter";
import FavPets from "../SectionProfile";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Если данные пользователя еще загружаются
  if (loading) {
    return <div>Loading...</div>;
  }

  // Если пользователь не авторизован
  if (!user) {
    navigate("/login");
    return null;
  }

  const searchPageLinks = [
    {
      className: "interactive",
      text: "About the shelter",
      link: "/",
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
      className: "active",
      text: user.isAdmin ? "Admin" : "Profile",
      link: "#",
    },
  ];

  return (
    <>
      <MyHeader
        links={searchPageLinks}
        customClass={"second-page-header"}
      ></MyHeader>
      <div className="main">
        <EditUser></EditUser>
        <AddNewPet></AddNewPet>
        {user.isAdmin && <AdminPets></AdminPets>}
        {!user.isAdmin && <FavPets></FavPets>}
        {!user.isAdmin && <AdoptedPets></AdoptedPets>}
      </div>
      <SectionFooter></SectionFooter>
    </>
  );
}
