import React from 'react';
import image from "../slider/images.png"

const ChargeScreen = ({isCharging }) => {
    const hiddenShowClass = isCharging ? "screen-display-flex" : "screen-display-none";
    return (
      <div 
          className={ hiddenShowClass + " " + "charge-screen"}
      >
        <img 
            src={image} alt="charge screen"
        />
      </div>
    );
  }

export default ChargeScreen;