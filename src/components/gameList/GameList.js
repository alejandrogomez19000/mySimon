import React, { Component } from 'react';
import GameCardContainer from './gameContainer/GameCardContainer';
import ChargeScreen from "./chargeScreen/ChargeScreen"

class GameList extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: [],
      data : [],
      isCharging: true,
      showCards: false
    }
    this.get = this.get.bind(this)
  }

  componentDidMount(){
    this.get("https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?limit=100&format=json&api_key=7abd6dcdd73de03a0888b1e13cb57c651ce1b0c7&callback=responseReceived")
    .then((result) =>{
        console.log(result);
        this.setState({
          data: result,
          isCharging: false,
          showCards: true
        })
      }
    )
  }

  componentDidUpdate( prevProps , prevState ){
    if(this.state.data !== prevState.data){
     this.handleCreateGames();
    }
  }

  // Consume the api and return the results

  get(path) {
    return fetch(path)
            .then(res => res.json())
            .then((result) => {
                    return result;
                },(error) => {
                    return "ERROR";
                }  
            )
  }

  

  // Function that creates the random games for display in the game list

  handleCreateGames = () =>{
    let games = [];
    while (games.length < 15) {
      let { results } = this.state.data;
      const index = Math.floor(Math.random() * results.length);

      games.push(results.splice(index , 1))
    } 
    console.log(games , "desde el handleCreateGames")
    return this.setState({ games }) 
  }
  
  render() {
    return (
      <div 
      className="game-card-list-container"
      >
        <GameCardContainer
            showCards={this.state.showCards}
            get={this.get}
            data={this.state.games}
         />
         <ChargeScreen 
            isCharging={this.state.isCharging}
         />
      </div>
    );
  }
}



export default GameList;