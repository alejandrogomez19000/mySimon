import React, {Component} from 'react';
import GameContainer from './components/GameContainer';
import './App.css';
import {disabledFunction, helperSimonTurn} from './components/gameHelpers/GameHelper';
import YouWinModal from "./components/modal/YouWinModal";
import YouLoseModal from "./components/modal/YouLoseModal";
import GameHeader from "./components/gameList/gameHeader/GameHeader";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalPattern: [],
      matchLevel: 0,
      isSimonTurn: false,
      youLose: false,
      comparative: [],
      isFinish: false,
      isGuessed:0,
      showModal:false,
      maxLevel: 6,
      isPlayerTurn: false
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
      if (this.state.matchLevel > this.state.maxLevel) {
        this.handleIsFinish();
      } else if (!this.state.isFinish && this.state.isSimonTurn === true) {
        this.handleSimonTurn(this.state.totalPattern);
      }
    } else if (this.state.isPlayerTurn !== prevState.isPlayerTurn){
      if(this.state.isPlayerTurn === true){
        this.handleInitiatePlayerTurn();
      }
    }
  }

  // Function that is called if you won the game and show the modal to see more games

  handleIsFinish() {
    const audio = document.getElementById("final-sound");
    audio.play();
    this.setState({
      isFinish: true,
      showModal: true
    })
  }

  // Functions to add a new pattern in the simon turn

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
  
  // Function that declares the start of simon turn

  handleSimonTurn(patterns) {
    helperSimonTurn(patterns, this.myDiv);
    setTimeout(()=>{
      this.setState({
        isSimonTurn: false,
        isPlayerTurn: true
      })
    }, patterns.length * 600)
  }

   // Function that declares the player's turn and enables the buttons to compare them with buttons pressed by Simon

  handleInitiatePlayerTurn() {
    const myDiv = this.myDiv.current;
    disabledFunction( myDiv , false );
  }

   // Function that compare the player's clicks with the simon's clicks

  handlePlayerTurn = e => {
    if(this.state.isPlayerTurn === true){
      let { isGuessed   , comparative } = this.state;
      const id = parseInt(e.target.id);
      const myDiv = this.myDiv.current;
  
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
          const audio = document.getElementById(`win-sound`);

          audio.play();

          disabledFunction( myDiv,true );
          
          this.setState({
            isSimonTurn: true,
            isGuessed: 0,
            isPlayerTurn: false
          })
          setTimeout(()=>{
            this.handleNewSequence()
          }, 800)
        }
      } else {
        const audio = document.getElementById(`lose-sound`);
        audio.play();
        this.setState({
          youLose: true,
          showModal: true
        })
      }
    } 
  }

  handlePlayAgain(){
    setTimeout(()=>{
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
    } , 2000) 
  }
  // Function that receive the GameContainer's div to use in this component
  handle(myDiv) {
    this.myDiv = myDiv;
  }

  render() {
    return (
      <div className="App">
        <GameHeader />
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
