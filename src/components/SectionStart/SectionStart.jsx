import MyHeader from "./MyHeader/MyHeader.jsx"
import NotOnly from "./NotOnly/NotOnly.jsx"
import './SectionStart.css'

export default function SectionStart(){
    return (
        <div className="sectionStart">
            <MyHeader></MyHeader>
            <NotOnly></NotOnly>
        </div>
    )
}