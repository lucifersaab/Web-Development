import NavbarComponent from "./Navbar/Navbar"
import './App.css';
import { LandingPage } from "./LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <LandingPage></LandingPage>
    </div>
  );
}

export default App;
