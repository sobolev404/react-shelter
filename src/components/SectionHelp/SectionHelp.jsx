import { helpData } from "./SectionHelpData.js";
import "./SectionHelp.css";
export default function SectionHelp() {
  return (
    <section className="help-sec content">
      <div id="help" className="help">
        <h2>
          How you can help
          <br />
          our shelter
        </h2>
        <ul>
          {helpData.map((item) => {
            return (
              <li className="help-item">
                <img src={item.helpImg} alt="food-img" />
                <p className="help-desc">{item.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
