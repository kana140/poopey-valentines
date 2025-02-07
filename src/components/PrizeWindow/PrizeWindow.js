import cookies from "../../assets/characters/prizes/cookies.png";
import "./PrizeWindow.css";

export default function PrizeWindow({
  prize,
  showPrizeWindow,
  setPrizeWindow,
}) {
  return (
    <div
      className="prizeWindow"
      onClick={() => setPrizeWindow(false)}
      style={{ display: showPrizeWindow ? "block" : "none" }}
    >
      <img src={prize?.image}></img>
      <p> You caught... {prize?.item}!</p> <br />
      <p> Click to collect</p>
    </div>
  );
}
