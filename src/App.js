import React, {Component} from 'react'
import GameContainer from './components/GameContainer'
import './App.css'
import {disabledFunction, helperSimonTurn} from './components/gameHelpers/GameHelper'
import YouWinModal from "./components/modal/YouWinModal"
import YouLoseModal from "./components/modal/YouLoseModal"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPattern: [],
      matchLevel: 0,
      isSimonTurn: true,
      isPlayerTurn: false,
      youLose: false,
      comparative: [],
      isFinish: false,
      isGuessed:0,
      showModal:false
    }
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handle = this.handle.bind(this);
    this.handleSimonTurn = this.handleSimonTurn.bind(this);
    this.handleAddSequence = this.handleAddSequence.bind(this);
    this.handleNewSequence = this.handleNewSequence.bind(this);
    this.myDiv = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.matchLevel !== prevState.matchLevel && this.state.isSimonTurn === true) {
      if (this.state.matchLevel === 7) {
        this.handleIsFinish()
      } else if (!this.state.isFinish && this.state.isSimonTurn === true) {
        this.handleSimonTurn(this.state.totalPattern)
      }
    } else if (this.state.isSimonTurn === false) {
      this.handleInitiatePlayerTurn()
    } 
  }

  handleIsFinish() {
    this.setState({
      isFinish: true,
      showModal: true
    })
  }

  handleAddSequence(dataTotalPatterns) {
    this.setState({
      totalPattern: dataTotalPatterns,
      comparative: dataTotalPatterns,
      matchLevel: this.state.matchLevel + 1,
      isSimonTurn: true,
    })
  }
  handleNewSequence(){
    let auxArr = []
    const { totalPattern } = this.state;
    const newSequence = Math.round(Math.random() * (15 - 0) + 1)
    auxArr = totalPattern
    auxArr.push(newSequence)
    this.handleAddSequence(auxArr)
  }
  handleSimonTurn(patterns) {
    helperSimonTurn(patterns, this.myDiv)
    this.setState({
      isSimonTurn: false,
    })
  }

  handleInitiatePlayerTurn() {
    const myDiv = this.myDiv.current;
    if (this.state.isSimonTurn === false) {
      disabledFunction(myDiv, false)
    } else {
      disabledFunction(myDiv, true)
    }
  }

  handle(myDiv) {
    this.myDiv = myDiv
  }

  handlePlayerTurn = e => {
    const myDiv = this.myDiv.current;
    let { isGuessed   , comparative } = this.state;
    const id = parseInt(e.target.id);

    this.setState({
      isPressed:true,
      buttonPressed: id
    })
    setTimeout(()=>{
      this.setState({
        isPressed:false
      })
    }, 200)
    if (comparative[isGuessed] === id) {
      this.setState({
        isGuessed: isGuessed +1
      })
  
      if (isGuessed +1 === comparative.length) {    
          this.setState({
            isSimonTurn: true,
            isGuessed: 0
          })
          disabledFunction(myDiv, true)

         console.log("pasaste el nivel")
         const audio = document.getElementById(`win-sound`);
         audio.play();
          setTimeout(()=>{
            this.handleNewSequence()
          }, 800)
      }
    } else {
      const audio = document.getElementById(`lose-sound`);
      audio.play();
      console.log('perdiste')
      this.setState({
        youLose: true,
        showModal: true
      })
    }
    
  }

  handlePlayAgain(){
    this.setState({
      totalPattern: [],
      matchLevel: 0,
      isSimonTurn: true,
      isPlayerTurn: false,
      youLose: false,
      comparative: [],
      isFinish: false,
      isGuessed:0,
      showModal:false
    })
    setTimeout(()=>{
      this.handleNewSequence();
    } , 500) 
  }
  render() {
    return (
      <div className="App">
          <div className="game">
            <GameContainer
              handleNewSequence={this.handleNewSequence}
              gameStarted={this.state.gameStarted}
              handlePlayerTurn={this.handlePlayerTurn}
              handle={this.handle}
              handleAddSequence={this.handleAddSequence}
              totalPattern={this.state.totalPattern}
              isPressed={this.state.isPressed}
              buttonPressed={this.state.buttonPressed}
            />
            <YouWinModal 
              isFinish={this.state.isFinish} 
              handlePlayAgain={this.handlePlayAgain} 
              handleMoreGames={this.handleMoreGames}
            />
            <YouLoseModal
              youLose={this.state.youLose}
              handlePlayAgain={this.handlePlayAgain} 
            />
          </div>

      </div>
    )
  }
}

export default App
