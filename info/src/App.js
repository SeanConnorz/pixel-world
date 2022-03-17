import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import NFT from "./components/NFT/Index";
import About from "./components/About";
import Roadmap from "./components/Roadmap";
import Team from "./components/Team";
import star1 from "./images/star1.png";
import star2 from "./images/star2.png";
import star3 from "./images/star3.png";

import { useEffect, useState } from "react";

function App() {
  const [stars, setStars] = useState([]);

  const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const selectRandomStar = () => {
    const randNum = randomNumberBetween(0, 3);
    const starImages = [star1, star2, star3];
    return starImages[randNum];
  };

  const createStars = (icon, arr) => {
    const top = randomNumberBetween(1, 400);

    const img = (
      <img
        style={{ top: `${top}%`, left: `${randomNumberBetween(0, 92)}vw` }}
        className="stars"
        src={icon}
      ></img>
    );
    arr.push(img);
  };

  useEffect(() => {
    const starArr = [];
    const temp = () => {
      let counter = 0;
      while (counter < 50) {
        createStars(selectRandomStar(), starArr);
        counter++;
      }
    };
    temp();
    setStars(starArr);
  }, []);

  return (
    <div className="App flex flex-col items-center text-white">
      <Navbar />
      {stars}
      <LandingPage />
      <NFT />
      <About />
      <Roadmap />
      <Team />
    </div>
  );
}

export default App;
