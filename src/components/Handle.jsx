import { useEffect } from "react";
import useHandle from "../hooks/useHandle";

function Handle({ solution }) {
  const { current, handleKeyup } = useHandle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div>
      <h3>{current}</h3>
      {/* <div className="Board">{solution && <BoardRow solution={current} />}</div> */}
    </div>
  );
}
export default Handle;
