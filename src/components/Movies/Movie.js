import "./Movie.css";

const Movie = ({ id, title, image, description, rating }) => {
  return (
    <div className="mov">
      <img className="cover" src={`${image}`} alt={title} />
      <b className="title">{title}</b>
      <span className="info">
        {rating}
        <span className="info">{description}</span>
      </span>
    </div>
  );
};

export default Movie;