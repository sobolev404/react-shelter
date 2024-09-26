import './App.css';
import SectionStart from './components/SectionStart/SectionStart';
import SectionAbout from './components/SectionAbout/SectionAbout';
import SectionHelp from './components/SectionHelp/SectionHelp';
import SectionDonation from './components/SectionDonation/SectionDonation';
import SectionFooter from './components/SectionFooter/SectionFooter';
import SectionFriends from './components/SectionFriends/SectionFriends';

function App() {
  return (
    <div className="App">
      <SectionStart></SectionStart>
      <SectionAbout></SectionAbout>
      <SectionFriends></SectionFriends>
      <SectionHelp></SectionHelp>
      <SectionDonation></SectionDonation>
      <SectionFooter></SectionFooter>
    </div>
  );
}

export default App;
