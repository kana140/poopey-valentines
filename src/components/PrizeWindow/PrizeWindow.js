import cookies from "../../assets/characters/prizes/cookies.png";
import "./PrizeWindow.css";

export default function PrizeWindow({
  prize,
  showPrizeWindow,
  setPrizeWindow,
}) {
  var randomPrize = ["giorno", "a claw machine"].includes(prize?.item);
  return (
    <div
      className="prizeWindow"
      onClick={() => setPrizeWindow(false)}
      style={{ display: showPrizeWindow ? "block" : "none" }}
    >
      <div className="image-wrapper">
        <img src={prize?.image}></img>
      </div>
      {randomPrize ? (
        <p>
          {" "}
          Oh no! That's not a gift, that's {prize?.item}. Keep fishing to get
          the real prize{" "}
        </p>
      ) : (
        <p> Jackpot! You caught... {prize?.item}!</p>
      )}
      <br />
      <p> Click to collect</p>
    </div>
  );
}
