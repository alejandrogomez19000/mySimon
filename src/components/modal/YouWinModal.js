import React from 'react';
import { Link , Route } from "react-router-dom"

const youWinModal = ({ handleMoreGames, handlePlayAgain ,isFinish }) => {
  const showHideClassName = isFinish ? "modal modal-display-block" : "modal modal-display-none";

  return (
    <div 
        className={showHideClassName}
    >
      <section 
          className="modal-main"
      >
        <section>
            <p 
                className="modal-p"
            >
                Has Ganado!!
            </p>

            <button 
                className="modal-button" 
                onClick={handlePlayAgain}
            >
                  Juega otra vez!
            </button>
            <Link to={"/gamelist"}>
              <button 
                  className="modal-button" 
                  onClick={handleMoreGames}
              >
                Mas juegos!
              </button>
            </Link>
        </section>
      </section>
    </div>
  );
}

export default youWinModal;
