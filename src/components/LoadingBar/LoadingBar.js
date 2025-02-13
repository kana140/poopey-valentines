import React, { useState, useEffect } from "react";
import "./LoadingBar.css";
import convertSeconds from "convert-seconds";

const LoadingBar = () => {
  const [percentage, setPercentage] = useState(0); // Starting at 0%

  const schedule = {
    9: { to: "12", percentage: 25 },
    12: { to: "15", percentage: 50 },
    15: { to: "18", percentage: 75 },
    18: { to: "9", percentage: 100 },
  };

  const currentMoment = new Date();
  const currentHour = currentMoment.getHours();
  const currentTime = currentMoment.getTime();
  const sixPM = new Date(
    currentMoment.getFullYear(),
    currentMoment.getMonth(),
    currentMoment.getDate(),
    18,
    0,
    0,
    0
  );
  // const timeLeft = (sixPM.getTime() - currentTime) / 1000;
  var timeLeft = (sixPM.getTime() - currentTime) / 1000;
  if (timeLeft < 0) timeLeft = 0;

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        // setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // setPercentage((timeLeft / duration) * 100);
      setPercentage((sixPM.getTime() / currentTime) * 100);

      return () => clearInterval(interval);
    } else {
      setPercentage(100);
      clearInterval();
    }
  }, [timeLeft]);

  return (
    <div className="loading-container">
      <div className="loading-bar" style={{ width: `${percentage}%` }}></div>
      <div className="time-left">
        {convertSeconds(timeLeft).hours} hours{" "}
        {convertSeconds(timeLeft).minutes} minutes and{" "}
        {convertSeconds(timeLeft).seconds} seconds left to catch fish!
      </div>
    </div>
  );
};

export default LoadingBar;
