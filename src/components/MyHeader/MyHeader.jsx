import Burger from '../Burger';
import './MyHeader.css'

export default function MyHeader() {
  return (
      <header className="header">
        <a href='#'>
          <div className="logo">
            <p className="logo-main">Cozy House</p>
            <p className="logo-sub">Shelter for pets in Boston</p>
          </div>
        </a>

        <nav>
          <ul className="nav">
            <li className="active">
              <a href="#">About the shelter</a>
            </li>
            <li className="interactive">
              <a href="#">Our pets</a>
            </li>
            <li className="interactive">
              <a href="#">Help the shelter</a>
            </li>
            <li className="interactive">
              <a href="#">Contacts</a>
            </li>
          </ul>
        </nav>
        <Burger onClick={()=>console.log('burger')}></Burger>
      </header>
  );
}
