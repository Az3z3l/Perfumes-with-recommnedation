
import "./carosel.css";

const Carousel = (props) => {
  return (
    <div>
      <img
        src={props.children}
        className="d-block w-100 crop-image"
        alt="..."
      />
    </div>
  );
};

export default Carousel;