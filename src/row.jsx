function BoardRow({ solution }) {
  return (
    <div className="BoardRow">
      <div className="BoardSquare">
        <h2>{solution[0].toUpperCase()}</h2>
      </div>
      <div className="BoardSquare">
        <h2>{solution[1]}</h2>
      </div>
      <div className="BoardSquare">
        <h2>{solution[2]}</h2>
      </div>
      <div className="BoardSquare">
        <h2>{solution[3]}</h2>
      </div>
      <div className="BoardSquare">
        <h2>{solution[4]}</h2>
      </div>
    </div>
  );
}
export default BoardRow;
