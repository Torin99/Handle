import { useEffect } from "react";
import useHandle from "../hooks/useHandle";
import BoardRow from "../BoardRow";
import Board from "../Board";

function Handle({ solution }) {
  const { current, history, guessList, handleKeyup } = useHandle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <div>
        {/* <BoardRow solution={solution.word} /> */}
        {console.log(solution)}
        <Board entry={current} guessList={guessList} solution={solution} />
      </div>
      {/* <div className="Board">{solution && <BoardRow solution={current} />}</div> */}
    </div>
  );
}
export default Handle;
