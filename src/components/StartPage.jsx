import React, { useRef, useState } from 'react';
import '../index.css';
import female1 from '../assest/f1.png';
import female2 from '../assest/f2.png';
import male1 from '../assest/m1.png';
import male2 from '../assest/m2.png';
import BoardBackground from './BoardBackground';
import Winner from './Winner';

// x,x2 ---female
// y,y2 ---male

/*--- profile images for players */
const imageDetails = [
   { id: 'x', src: female1 },
   { id: 'x2', src: female2 },
   { id: 'y', src: male1 },
   { id: 'y2', src: male2 },
];

export default function StartPage() {
   /*--- State for Game ---*/
   const [squares, setSquares] = useState(Array(9).fill(null));
   const [isNext, setIsNext] = useState(true);
   const [selectedImageId, setSelectedImageId] = useState(null);

   /*--- Ref for Game ---*/

   const startBtnRef = useRef(null);
   const startClassRef = useRef(null);
   const itemRef = useRef(null);

   /*--- this is for start game or hide start page component ---*/
   function startGameHandle(ref) {
      startClassRef.current.classList.add('hide');
      setIsNext(true);
   }

   /*--- Player Mapping  - because we need to select 2nd player on tha basis of 1st player ---*/
   const playerMapping = {
      y: { player1: 'y', player2: 'x' },
      y2: { player1: 'y2', player2: 'x2' },
      x: { player1: 'x', player2: 'y' },
      x2: { player1: 'x2', player2: 'y2' },
   };

   const { player1 = 'x', player2 = 'y' } =
      playerMapping[selectedImageId] || {};

   /*--- handler for Square component ---*/
   function onSquareClick(i) {
      // prevent clicking after wining or selected
      if (squares[i] || winner) {
         return;
      }
      const nextSquares = squares.slice(); // copy all 9 squares history array
      // As we are updating 9 squares grid with Array
      if (isNext) {
         nextSquares[i] = player1;
      } else {
         nextSquares[i] = player2;
      }
      setSquares(nextSquares); // updating array with players

      setIsNext(!isNext); // changing state for next player turn
   }

   /*--- Recived object from Winner component and destructure immediately ---*/
   let { line, winner, draw } = Winner(squares);

   /*--- this is used to remove selected class after clicking restart button ---*/
   function showHandler() {
      winner = null;
      setSquares(Array(9).fill(null)); // reset all squares

      startClassRef.current.classList.remove('hide');

      const map = itemRef.current;
      const entries = Array.from(map.entries());
      // get the key & value pair from  Map
      const selectedEntry = entries.find(([key, value]) =>
         value.classList.contains('selected')
      ); // this will give us true and false result

      //const selectedKey = selectedEntry ? selectedEntry[0] : null;
      const selectedValue = selectedEntry ? selectedEntry[1] : null;

      selectedValue?.classList.remove('selected');
   }

   /*--- this kis for setting DOM node ref on array of images ---*/
   // for generating map w.r.t. node present or note
   function getMap(ref) {
      if (!itemRef.current) {
         itemRef.current = new Map(); // replacing default null value to Map
      } // for storing ref recived from React
      return itemRef.current;
   }
   // click handler for image selected
   function selectedImage(itemID) {
      const map = getMap();
      const node = map.get(itemID);

      if (!node.classList.contains('selected')) {
         node.classList.add('selected');
         setSelectedImageId(itemID);
      }
   }

   /* UI returned for start page component  */
   return (
      <div>
         <div className='start-game' ref={startClassRef}>
            <h1 className='text-light'>Select Character</h1>
            <div className='profile'>
               {imageDetails.map(
                  (
                     image,
                     index // map on array of Object
                  ) => (
                     <img
                        key={image.id}
                        src={image.src}
                        className={
                           selectedImageId === image.id ? 'selected' : ''
                        }
                        id={image.id}
                        alt={`Character ${index + 1}`}
                        ref={(imgNode) => {
                           // imgNode DOM node referance reveived
                           const map = getMap();
                           if (imgNode) {
                              map.set(imgNode?.id, imgNode); // ser ref to Map
                           } else {
                              map.delete(imgNode?.id); // delete ref for other ids
                           }
                        }}
                        onClick={() => selectedImage(image.id)}
                     />
                  )
               )}
            </div>
            <button
               className='primary-btn'
               id='start-btn'
               ref={startBtnRef}
               onClick={() => startGameHandle(startBtnRef.current)}>
               Start Game
            </button>
         </div>

         <BoardBackground
            selectedPlayer={selectedImageId} // for hover on blocks on board
            onSquareClick={onSquareClick} // handler on block/square component
            player1={player1} // for Board Background component
            player2={player2}
            squares={squares} // State history for 9 blocks squares
            isNext={isNext} // for player turn
            winner={winner} // this for showing Winner component
            line={line} // lines imported from CalculateWinner
            showHandler={showHandler} // for restting state after click Restart button
            draw={draw} // to show draw component
         />
      </div>
   );
}
