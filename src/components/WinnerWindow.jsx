const WinnerWindow = ({ winner, showHandler, resetShowWindow }) => {
   return (
      <div className={`winner-msg ${winner ? 'show' : ''} `}>
         <h1 className='text-center text-yellow'>Winner</h1>
         <div className='winner'></div>
         <button className={`block ${winner} `}></button>
         <button id='restartBtn' className='primary-btn' onClick={showHandler}>
            Restart
         </button>
      </div>
   );
};

export default WinnerWindow;
