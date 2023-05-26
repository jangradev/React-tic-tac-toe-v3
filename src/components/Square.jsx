export default function Square({ value, onSquareClick, highlight }) {
   return (
      <button
         className={`block ${value} ${highlight ? 'highlight' : ''}`}
         onClick={onSquareClick}></button>
   );
}
