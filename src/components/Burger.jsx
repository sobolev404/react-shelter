export default function Burger({onClick}) {
  return (
    <div className="burger" onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
