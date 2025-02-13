import React, { useState, useEffect } from "react";
import "./LoadingBar.css";
import convertSeconds from "convert-seconds";

const LoadingBar = () => {
  const prizeTimes = [9, 12, 15, 18]; // Prize times at 9AM, 12PM, 3PM, and 6PM
  const now = new Date();
  const currentHour = now.getHours();

  const getNextPrizeTime = () => {
    for (let hour of prizeTimes) {
      if (currentHour < hour) {
        const nextPrize = new Date();
        nextPrize.setHours(hour, 0, 0, 0);
        return nextPrize;
      }
    }
    return null; // No more prizes today
  };

  const nineAM = new Date();
  nineAM.setHours(9, 0, 0, 0);

  const sixPM = new Date();
  sixPM.setHours(18, 0, 0, 0);

  const totalDuration = (sixPM.getTime() - nineAM.getTime()) / 1000;
  const elapsedTime = (now.getTime() - nineAM.getTime()) / 1000;
  const initialPercentage = Math.max(
    0,
    Math.min((elapsedTime / totalDuration) * 100, 100)
  );
  const nextPrizeTime = getNextPrizeTime();
  const [timeLeft, setTimeLeft] = useState(
    nextPrizeTime ? (nextPrizeTime.getTime() - now.getTime()) / 1000 : 0
  );
  const [percentage, setPercentage] = useState(initialPercentage);

  useEffect(() => {
    if (!nextPrizeTime) return; // No more updates after 6PM

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = (nextPrizeTime.getTime() - currentTime) / 1000;
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
        {convertSeconds(Math.max(0, Math.floor(timeLeft))).hours} hours{" "}
        {convertSeconds(Math.max(0, Math.floor(timeLeft))).minutes} minutes and{" "}
        {convertSeconds(Math.max(0, Math.floor(timeLeft))).seconds} seconds left
        until your next prize!
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
