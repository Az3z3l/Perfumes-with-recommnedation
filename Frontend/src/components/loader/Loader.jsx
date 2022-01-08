import './Loader.css';

export const Loader = (props) => {
  return (
    <>
    <div className="loading-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
        <span className="loading-container mt-16 text-4xl">{props?.msg}...</span>
        </>
  );
};
