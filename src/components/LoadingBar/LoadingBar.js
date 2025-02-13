import React, { useState, useEffect } from "react";
import "./LoadingBar.css";
import convertSeconds from "convert-seconds";

const LoadingBar = () => {
  const nineAM = new Date();
  nineAM.setHours(9, 0, 0, 0);

  const sixPM = new Date();
  sixPM.setHours(18, 0, 0, 0);

  const totalDuration = (sixPM.getTime() - nineAM.getTime()) / 1000;
  const now = new Date().getTime();
  const elapsedTime = (now - nineAM.getTime()) / 1000;
  const initialPercentage = Math.max(
    0,
    Math.min((elapsedTime / totalDuration) * 100, 100)
  );

  const [timeLeft, setTimeLeft] = useState((sixPM.getTime() - now) / 1000);
  const [percentage, setPercentage] = useState(initialPercentage);

  useEffect(() => {
    if (timeLeft <= 0) {
      setPercentage(100);
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = (sixPM.getTime() - currentTime) / 1000;
      const elapsedTime = (currentTime - nineAM.getTime()) / 1000;

      if (remainingTime <= 0) {
        setTimeLeft(0);
        setPercentage(100);
        clearInterval(interval);
      } else {
        setTimeLeft(remainingTime);
        setPercentage(
          Math.max(0, Math.min((elapsedTime / totalDuration) * 100, 100))
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, totalDuration]);

  return (
    <div className="loading-container">
      <div className="loading-bar" style={{ width: `${percentage}%` }}></div>
      <div className="time-left">
        {convertSeconds(timeLeft).hours} hours{" "}
        {convertSeconds(timeLeft).minutes} minutes and{" "}
        {convertSeconds(timeLeft).seconds} seconds left to catch fish!
      </div>
      <div className="time-markers">
        <span className="time-marker">9AM</span>
        <span className="time-marker">12PM</span>
        <span className="time-marker">3PM</span>
        <span className="time-marker">6PM</span>
      </div>
    </div>
  );
};

export default LoadingBar;
