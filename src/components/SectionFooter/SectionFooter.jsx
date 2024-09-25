import emailIcon from '../../assets/icons/icon-email.svg'
import phoneIcon from '../../assets/icons/icon-phone.svg'
import locIcon from '../../assets/icons/icon-marker.png'
import footerPuppy from '../../assets/img/footer-puppy.png'
import './SectionFooter.css'
export default function SectionFooter() {
  return (
    <div className="wrapper-footer">
      <footer className="content footer">
        <div id="contacts" className="contacts">
          <h3>For questions and suggestions</h3>
          <a href="https://mail.google.com/" target="_blank">
            <div className="mail contacts-item">
              <img src={emailIcon} alt="email" />
              <p>email@shelter.com</p>
            </div>
          </a>
          <a href="tel:+136745677554">
            <div className="phone contacts-item">
              <img src={phoneIcon} alt="phone" />
              <p>+13 674 567 75 54</p>
            </div>
          </a>
        </div>
        <div className="location">
          <h3>We are waiting for your visit</h3>
          <a href="https://www.google.com/maps/place/Zhlobin" target="_blank">
            <div className="location-item">
              <img src={locIcon} alt="loc" />
              <p>1 Central Street, Boston (entrance from the store)</p>
            </div>
          </a>
          <a href="https://www.google.com/maps/place/Zhlobin" target="_blank">
            <div className="location-item">
              <img src={locIcon} alt="loc" />
              <p>18 South Park, London</p>
            </div>
          </a>
        </div>
        <img
          className="footer-img"
          src={footerPuppy}
          alt="footer-puppy"
        />
      </footer>
    </div>
  );
}
