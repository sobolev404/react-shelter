import MyHeader from "../MyHeader/MyHeader"
import NotOnly from "../NotOnly/NotOnly"
import './SectionStart.css'

export default function SectionStart(){
    return (
        <div className="sectionStart">
            <MyHeader></MyHeader>
            <NotOnly></NotOnly>
        </div>
    )
}