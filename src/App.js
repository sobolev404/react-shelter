import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SectionStart from "./components/SectionStart/SectionStart";
import SectionAbout from "./components/SectionAbout/SectionAbout";
import SectionHelp from "./components/SectionHelp/SectionHelp";
import SectionDonation from "./components/SectionDonation/SectionDonation";
import SectionFooter from "./components/SectionFooter/SectionFooter";
import SectionFriends from "./components/SectionFriends/SectionFriends";
import SecondPage from "./components/SecondPage/SecondPage"; // Импортируем вторую страницу
import SearchPage from "./components/SearchPage/SearchPage";


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
                <SectionFriends useNavigation={true} usePagination={false} customClass={''}/>
                <SectionHelp />
                <SectionDonation />
                <SectionFooter />
              </>
            }
          />
          <Route path="/second" element={<SecondPage />} />{" "}
          <Route path="/search" element={<SearchPage/>} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
