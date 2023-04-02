import { memo } from "react";
import { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";

function EntrySquare({ signVal }) {
  return (
    <div className="EntrySquare">
      {signVal === "THUMBS UP" && (
        <h1>
          <BsHandThumbsUp />
        </h1>
      )}
      {signVal !== "THUMBS UP" && <h1>{signVal}</h1>}
    </div>
  );
}
export default memo(EntrySquare);
