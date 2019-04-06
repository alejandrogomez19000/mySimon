import React, {Component} from 'react'
import GameButton from './gameButton/GameButton'
import './GameContainer.css'

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

class GameContainer extends Component {
  constructor(props) {
    super(props)
    this.myDiv = React.createRef();
    this.handleDiv = this.handleDiv.bind(this);
    this.handleDiv();
    this.startGame = this.startGame.bind(this);
    this.state = {
      gameStarted: false
    }
  }

  buildButton(buttons) {
    return buttons.map(element => {
      return  <GameButton 
                id={element} 
                buttonPressed={this.props.buttonPressed} 
                isPressed={this.props.isPressed} 
                key={element} 
              />
     }
   )
  }

  handleDiv() {
    this.props.handle(this.myDiv)
  }
 
  startGame(){
    this.setState({
      gameStarted: true
    })
    setTimeout(()=>{
      this.props.handleNewSequence()
    } , 1000)
  
  }
  render() {
    const buildButtons = this.buildButton(array)

    if(this.state.gameStarted === true ){
      return (
            <div ref={this.myDiv} 
                className="btn-container" 
                onClick={this.props.handlePlayerTurn}
              >
              {buildButtons}
            </div>
              )
    }
     else {   
      return(
            <div 
                className="btn-container"
            > 
              <div 
                  className="start-button" 
                  onClick={this.startGame}
              >
                  START
              </div>
            </div>
            )
    }
  }
}

export default GameContainer
