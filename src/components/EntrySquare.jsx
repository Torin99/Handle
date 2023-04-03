import { BsHandThumbsUp } from "react-icons/bs";

function EntrySquare({ signVal }) {
  // show value detected from sign language, hit space to enter
  return (
    <div className="EntrySquare">
      {signVal === "THUMBS UP" && ( //if thumbs up display icon
        <h1>
          <BsHandThumbsUp />
        </h1>
      )}
      {signVal !== "THUMBS UP" && (
        <h1>{signVal}</h1> //otherwise display letter
      )}
    </div>
  );
}
export default EntrySquare;
