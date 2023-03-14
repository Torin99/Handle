import { useEffect } from "react";
import useHandle from "../hooks/useHandle";

function Handle({ solution }) {
  const { currentGuess, handleKeyup } = useHandle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return <div>Handle</div>;
}
export default Handle;
