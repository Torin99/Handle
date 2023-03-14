import BoardRow from "./BoardRow";
function Board({ entry, history }) {
  let word = entry + "     ";
  return (
    <div className="Board">
      {history.map((guess) => (
        <BoardRow key={history.indexOf(guess)} solution={guess} />
      ))}
      <BoardRow solution={word} />
    </div>
  );
}
export default Board;
