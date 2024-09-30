import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SectionStart from "./components/SectionStart/SectionStart";
import SectionAbout from "./components/SectionAbout/SectionAbout";
import SectionHelp from "./components/SectionHelp/SectionHelp";
import SectionDonation from "./components/SectionDonation/SectionDonation";
import SectionFooter from "./components/SectionFooter/SectionFooter";
import SectionFriends from "./components/SectionFriends/SectionFriends";
import SecondPage from "./components/SecondPage/SecondPage"; // Импортируем вторую страницу

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SectionStart />
                <SectionAbout />
                <SectionFriends />
                <SectionHelp />
                <SectionDonation />
                <SectionFooter />
              </>
            }
          />
          <Route path="/second" element={<SecondPage />} />{" "}
          {/* Добавляем маршрут для второй страницы */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
