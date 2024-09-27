export default function PetCard({ imgUrl, imgAlt, petName, onClick }) {
  return (
    <div onClick={onClick} className="friend-item">
      <img src={imgUrl} alt={imgAlt} />
      <p className="friend-name">{petName}</p>
      <button className="btn-more">Learn more</button>
    </div>
  );
}
