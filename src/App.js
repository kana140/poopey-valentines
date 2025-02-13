import logo from "./logo.svg";
import "./App.css";
import PeanutSprite from "./components/PeanutSprite/Peanut";
import { Stack } from "@mui/material";
import MainContainer from "./components/MainContainer/MainContainer";
import LoadingBar from "./components/LoadingBar/LoadingBar";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className="app">
      <MainContainer></MainContainer>
      <BottomContainer />
    </div>
  );
}

export default App;

function WelcomeText() {
  return <div>Welcome Mr.Poopey!</div>;
}

function BottomContainer() {
  const now = new Date();
  const sixPM = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    18,
    0,
    0,
    0
  );
  const currentHour = now.getHours();
  var nextTime = "9am";
  if (currentHour >= 9 && currentHour < 12) nextTime = "12pm";
  else if (currentHour >= 12 && currentHour < 15) nextTime = "3pm";
  else if (currentHour >= 15 && currentHour < 18) nextTime = "6pm";

  const duration = (sixPM.getTime() - now.getTime()) / 1000;

  return (
    <div className="bottom">
      <WelcomeText />
      <LoadingBar></LoadingBar>
      <p>
        🎣 A new gift appears every 3 hours! Come back at {nextTime} to fish for
        yours—but watch out for sneaky fake gifts!
      </p>
    </div>
  );
}
