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
import giorno from "../../assets/characters/prizes/giorno.png";
import clawMachine from "../../assets/characters/prizes/clawmachine.png";

export default function MainContainer() {
  const [fishingDisabled, setFishingDisabled] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const fishingSchedule = {
    "09:00": [
      { item: "cookies", image: cookies },
      { item: "giorno", image: giorno },
      { item: "claw machine", image: clawMachine },
    ],
    "12:00": [
      { item: "voucher", image: ticket },
      { item: "giorno", image: giorno },
      { item: "claw machine", image: clawMachine },
    ],
    "15:00": [
      { item: "a picture", image: picture },
      { item: "giorno", image: giorno },
      { item: "claw machine", image: clawMachine },
    ],
    "18:00": [
      {
        item: "whiskey",
        image: whiskey,
      },
      { item: "giorno", image: giorno },
      { item: "claw machine", image: clawMachine },
    ],
  };

  const [currentCatch, setCurrentCatch] = useState(null);
  const scheduledTimes = Object.keys(fishingSchedule);

  const fish = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const prizeHour = checkHour(currentHour).padStart(2, "0") + ":00";

    if (fishingSchedule[prizeHour]) {
      setCurrentCatch(
        fishingSchedule[prizeHour].at(
          Math.floor(Math.random() * fishingSchedule[prizeHour].length)
        )
      );
    } else {
      setCurrentCatch(null);
    }
  };
  // useEffect(() => {
  //   const checkCatch = () => {
  //     const now = new Date();
  //     //   const currentHour = now.getHours().toString().padStart(2, "0") + ":00";
  //     const currentHour = now.getHours();
  //     const prizeHour = checkHour(currentHour).padStart(2, "0") + ":00";

  //     //   const currentT = scheduledTimes.map((ite) => {});
  //     if (fishingSchedule[prizeHour]) {
  //       setCurrentCatch(
  //         fishingSchedule[prizeHour].at(
  //           Math.floor(Math.random() * fishingSchedule[prizeHour].length)
  //         )
  //       );
  //     } else {
  //       setCurrentCatch(null);
  //     }
  //   };

  //   checkCatch();
  //   const interval = setInterval(checkCatch, 60 * 1000); // Check every minute

  //   return () => clearInterval(interval);
  // }, []);

  const checkHour = (currentHour) => {
    if (currentHour >= 0 && currentHour < 12) return "9";
    else if (currentHour >= 12 && currentHour < 15) return "12";
    else if (currentHour >= 15 && currentHour < 18) return "15";
    else if (currentHour >= 18) return "18";
  };

  const [showPrizeWindow, setPrizeWindow] = useState(false);

  return (
    <div className="mainContainer">
      <Stack direction="column" className="fishingContainer">
        <PrizeWindow
          prize={currentCatch}
          showPrizeWindow={showPrizeWindow}
          setPrizeWindow={setPrizeWindow}
        ></PrizeWindow>
        <Peanut currentAnimation={currentAnimation}></Peanut>
        <FishingButton
          sx={{ cursor: fishingDisabled ? "not-allowed" : "pointer" }}
          onClick={() => {
            fish();
            setCurrentAnimation("fishing");
            setTimeout(() => {
              setCurrentAnimation("shocked");
              setPrizeWindow(true);
              setTimeout(() => {
                setCurrentAnimation("idle");
              }, 3000);
            }, 3000);
          }}
        ></FishingButton>
      </Stack>
    </div>
  );
}
