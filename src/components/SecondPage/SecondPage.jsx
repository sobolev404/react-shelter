import SectionFooter from "../SectionFooter/SectionFooter";
import MyHeader from "../SectionStart/MyHeader/MyHeader";
import './SecondPage.css'
export default function SecondPage(){
  return (
    <>
        <MyHeader customClass={'second-page-header'}></MyHeader>
        <SectionFooter></SectionFooter>
    </>
  );
};
