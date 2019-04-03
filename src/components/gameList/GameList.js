import React, { Component } from 'react';
import GameCardContainer from './gameContainer/GameCardContainer';

class GameList extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: [],
      data : []
    }
    this.get = this.get.bind(this)
  }
  componentDidUpdate( prevProps , prevState ){
    if(this.state.data !== prevState.data){
     this.handleCreateGames();
    }
  }
   get(path) {

    return fetch(path)
      .then(res => res.json())
      .then(
          (result) => {
              return result;
          },
          (error) => {
              return "ERROR";
          }
      )
    }

    componentDidMount()
    {
      this.get("https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/games/?limit=100&format=json&api_key=7abd6dcdd73de03a0888b1e13cb57c651ce1b0c7&callback=responseReceived")
      .then((result) =>{
          console.log(result);
      })

    }
  
  handleCreateGames = () =>{
    let games = [];
    while (games.length < 15) {
      let { data } = this.state;
      const index = Math.floor(Math.random() * data.length);

      games.push(data.splice(index , 1))
    } 
    return this.setState({ games }) 
  }
  
  render() {
    return (
      <div 
      className="game-card-list-container"
      >
        <GameCardContainer
         data={this.state.games}
         />
      </div>
    );
  }
}



export default GameList;