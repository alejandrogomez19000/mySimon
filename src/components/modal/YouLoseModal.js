import React from 'react';

const YouLoseModal = ({ handlePlayAgain , youLose }) => {
  const showHideClassName = youLose ? "modal modal-display-block" : "modal modal-display-none";

  return (
    <div 
        className={showHideClassName}
    >
      <section 
          className="modal-main"
      >
        <section>
            <p className="modal-p"
            >
              Has perdido!!
            </p>

            <button 
                className="modal-button" 
                onClick={handlePlayAgain}
            >
              Juega otra vez!
            </button>
        </section>
      </section>
    </div>
  );
}

export default YouLoseModal;