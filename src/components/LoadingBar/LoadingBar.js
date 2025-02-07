import React, { useState, useEffect } from "react";
import "./LoadingBar.css";
import convertSeconds from "convert-seconds";

const LoadingBar = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Time in seconds
  const [percentage, setPercentage] = useState(100); // Starting at 100%
  // Update every second
  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // 1000ms = 1 second

      // Calculate percentage based on time left
      setPercentage((timeLeft / duration) * 100);

      return () => clearInterval(interval);
    } else {
      clearInterval();
    }

    //9am

    //12pm

    //3pm

    //6pm
  }, [timeLeft, duration]);

  return (
    <div className="loading-container">
      <div className="loading-bar" style={{ width: `${percentage}%` }}></div>
      <div className="time-left">
        {convertSeconds(timeLeft).hours} hours
        {convertSeconds(timeLeft).minutes} minutes and
        {convertSeconds(timeLeft).seconds} seconds left to catch fish!
      </div>
    </div>
  );
};

export default LoadingBar;
