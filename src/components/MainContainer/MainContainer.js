import "./MainContainer.css";
import Peanut from "../PeanutSprite/Peanut";
import FishingButton from "../FishingButton/FishingButton";
import PrizeWindow from "../PrizeWindow/PrizeWindow";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import cookies from "../../assets/characters/prizes/cookies.png";
import picture from "../../assets/characters/prizes/picture.png";
import ticket from "../../assets/characters/prizes/ticket.png";
import whiskey from "../../assets/characters/prizes/whiskey.png";

export default function MainContainer() {
  const [fishingDisabled, setFishingDisabled] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const fishingSchedule = {
    "09:00": { item: "cookies", image: cookies },
    "12:00": { item: "voucher", image: ticket },
    "15:00": { item: "a picture", image: picture },
    "18:00": {
      item: "whiskey",
      image: whiskey,
    },
  };

  const [currentCatch, setCurrentCatch] = useState(null);
  const scheduledTimes = Object.keys(fishingSchedule);

  useEffect(() => {
    const checkCatch = () => {
      const now = new Date();
      //   const currentHour = now.getHours().toString().padStart(2, "0") + ":00";
      const currentHour = now.getHours();
      const prizeHour = checkHour(currentHour).padStart(2, "0") + ":00";

      //   const currentT = scheduledTimes.map((ite) => {});
      if (fishingSchedule[prizeHour]) {
        setCurrentCatch(fishingSchedule[prizeHour]);
      } else {
        setCurrentCatch(null);
      }
    };

    checkCatch();
    const interval = setInterval(checkCatch, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const checkHour = (currentHour) => {
    if (currentHour >= 9 && currentHour < 12) return "9";
    else if (currentHour >= 12 && currentHour < 3) return "12";
    else if (currentHour >= 3 && currentHour < 6) return "3";
    else if (currentHour >= 6) return "6";
  };

  const [showPrizeWindow, setPrizeWindow] = useState(false);

  return (
    <div className="mainContainer">
      <div className="fishingContainer">
        <PrizeWindow
          prize={currentCatch}
          showPrizeWindow={showPrizeWindow}
          setPrizeWindow={setPrizeWindow}
        ></PrizeWindow>
        <Peanut currentAnimation={currentAnimation}></Peanut>

        <FishingButton
          sx={{ cursor: fishingDisabled ? "not-allowed" : "pointer" }}
          onClick={() => {
            setCurrentAnimation("fishing");
            setTimeout(() => {
              setCurrentAnimation("idle");
              setPrizeWindow(true);
            }, 3000);
          }}
        ></FishingButton>
      </div>
    </div>
  );
}
