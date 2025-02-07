import "./FishingButton.css";

export default function FishingButton({ onClick }) {
  return (
    <div className="fishingButton" onClick={onClick}>
      <p>FISH</p>
    </div>
  );
}
