
export default function Burger ({ active, onClick }){
  return (
    <div
      className={`burger ${active ? "_active" : ""}`}
      onClick={onClick}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

