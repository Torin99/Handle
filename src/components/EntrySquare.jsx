import { memo } from "react";
import { useState } from "react";

function EntrySquare({ signVal }) {
  console.log(signVal);
  return (
    <div className="EntrySquare">
      <h1>{signVal}</h1>
    </div>
  );
}
export default EntrySquare;
