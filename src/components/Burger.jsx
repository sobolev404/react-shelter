export default function Burger({ active, onClick }) {
  return (
    <div className={!active ? "burger" : "burger _active"} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
