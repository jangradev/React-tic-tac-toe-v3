import Square from './Square';
import DrawWindow from './DrawWindow';
import WinnerWindow from './WinnerWindow';
import useShowWindow from './useShowWindow';
import '../assest/f1.png';
import '../assest/m1.png';
import '../assest/m2.png';
import '../assest/f2.png';

const BoardBackground = ({
   player1,
   player2,
   squares,
   isNext,
   onSquareClick,
   winner,
   line,
   showHandler,
   draw,
}) => {
   let showWinnerWindow = useShowWindow(winner, 1500);
   let showDrawWindow = useShowWindow(draw, 1500);

   return (
      <>
         <div className={`container`}>
            <div
               className={`board ${isNext ? player1 : player2} ${
                  winner ? 'hide' : ''
               }`}
               id='board'>
               {squares.map((value, index) => (
                  <Square
                     key={index}
                     value={value}
                     onSquareClick={() => onSquareClick(index)} // passing function
                     highlight={line && line.includes(index)} // Check if index is in the line array
                  />
               ))}
            </div>
         </div>
         {showWinnerWindow && (
            <WinnerWindow winner={winner} showHandler={showHandler} />
         )}
         {showDrawWindow && (
            <DrawWindow draw={draw} showHandler={showHandler} />
         )}
      </>
   );
};
export default BoardBackground;
