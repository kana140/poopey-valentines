import { useState, useEffect } from "react";
import peanutFishingSprite from "../../assets/characters/peanutFishing/peanutfishing.png";
import peanutFishingData from "../../assets/characters/peanutFishing/peanutfishing.json";
import peanutIdleSprite from "../../assets/characters/peanutIdle/peanutidle.png";
import peanutIdleData from "../../assets/characters/peanutIdle/peanutidle.json";
import "./Peanut.css";

export default function Peanut({ currentAnimation }) {
  // Store all animations
  const animations = {
    idle: { json: peanutIdleData, image: peanutIdleSprite },
    fishing: { json: peanutFishingData, image: peanutFishingSprite },
    //shockedPeanut
  };

  // Get frame data dynamically
  const framesArray = Object.values(
    animations[currentAnimation].json.frames
  ).map((frame) => frame.frame);

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % framesArray.length);
    }, 500); // Adjust speed if needed

    return () => clearInterval(interval);
  }, [currentAnimation]); // Reset animation when it changes

  return (
    <div className="peanutContainer">
      <div
        style={{
          width: framesArray[currentFrame].w + "px",
          height: framesArray[currentFrame].h + "px",
          backgroundImage: `url(${animations[currentAnimation].image})`,
          backgroundPosition: `-${framesArray[currentFrame].x}px -${framesArray[currentFrame].y}px`,
          backgroundRepeat: "no-repeat",
          transform: "scale(0.4)",
        }}
      >
        {currentAnimation === "fishing" ? (
          <p>Just two peanuts fishing </p>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
