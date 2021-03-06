// Function to disable and enable buttons , only you can push any button if is player turn

export const disabledFunction = (div, boolean) => {
  for (let i = 0; i < 16; i++) {
    div.children[i].disabled = boolean;
    if( boolean === true ){
      div.children[i].style.pointerEvents = "none"
    } else if ( boolean === false ) {
      div.children[i].style.pointerEvents = "auto";
    }
  }
  
}
// Functions to create the lights in any button pushed by simon

export const helperSimonTurn = (patterns, data) => {
  const myDiv = data.current;
  patterns.forEach((e, i) => {
    if (e === parseInt(myDiv.children[e - 1].id)) {
      timerAdd(myDiv, e, i);
    }
  })
}

const timerDelete = (myDiv, e, i) => {
  setTimeout(() => {
    myDiv.children[e - 1].classList.remove(`btn-pressed-${e}`)
  }, i + 1 * 400)
}

const timerAdd = (myDiv, e, i) => {
  setTimeout(() => {
    const random = Math.round(Math.random() * 3 + 1);
    const audio = document.getElementById(`audio${random}`);
    audio.play();
    myDiv.children[e - 1].classList.add(`btn-pressed-${e}`);
    timerDelete(myDiv, e, i)
  }, i * 700)
}
