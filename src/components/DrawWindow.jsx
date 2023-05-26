const DrawWindow = ({ draw, showHandler }) => {
   return (
      <div className={`draw-msg ${draw ? 'show' : ''} `}>
         <div className='draw'>
            <h1 className='text-center text-yellow'>Draw</h1>
         </div>
         <button id='restartBtn' onClick={showHandler} className='primary-btn'>
            Restart
         </button>
      </div>
   );
};

export default DrawWindow;
