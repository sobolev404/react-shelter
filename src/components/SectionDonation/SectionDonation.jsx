import cardImg from '../../assets/icons/credit-card.svg'
import donationDog from '../../assets/img/donation-dog.png'
import './SectionDonation.css'
export default function SectionDonation(){
    return (
        <div className="wrapper-donation">
        <section className="donation-sec content">
          <div className="donation">
            <img className="donation-img" src={donationDog} alt="donat-img" />
            <div className="donation-block">
              <h2>
                You can also<br />
                make a donation
              </h2>
              <p>Name of the bank / Type of bank account</p>
              <div className="credit-card">
                <img
                  src={cardImg}
                  alt="card-img"
                />
                <a href="#"><p>8380 2880 8028 8791 7435</p></a>
              </div>
              <p className="instruction">
                Legal information and lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Maecenas a ipsum at libero sagittis dignissim
                sed ac diam. Praesent ultrices maximus tortor et vulputate.
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
}