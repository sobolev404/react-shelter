import './SectionAbout.css'
import aboutImg from '../../assets/img/about-pets.png'
export default function SectionAbout(){
    return (
        <section className="about-sec content">
        <div id="about" className="about">
          <img className="about-img" src={aboutImg} />
          <div className="about-block">
            <h2 className="about-title">About the shelter “Cozy House”</h2>
            <p className="about-text">
              Currently we have 121 dogs and 342 cats on our hands and
              statistics show that only 20% of them will find a family. The
              others will continue to live with us and will be waiting for a
              lucky chance to become dearly loved.
            </p>
            <p className="about-text">
              We feed our wards with the best food and make sure that they do
              not get sick, feel comfortable (including psychologically) and
              well. We are supported by 87 volunteers and 28 employees of
              various skill levels. About 12% of the animals are taken by the
              shelter staff. Taking care of the animals, they become attached to
              the pets and would hardly ever leave them alone.
            </p>
          </div>
        </div>
      </section>
    )
}