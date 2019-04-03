import React , { Component } from 'react';
import "./gameCard.css"

class GameCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data
    }
  }
  
  render(){
    const { description , name , image } = this.state.data;

    return (
      <div 
          className="game-card">
        <div 
            className="game-header"
        >
          <h1
             className="game-title">{name}
          </h1>
        </div>
        <div 
            className="game-body"
        >
          <img 
              src={image.original_url}
              alt="Logo" 
          />
          <div 
              dangerouslySetInnerHTML={{ __html : description }}
              className="game-description"
          >
          </div>
        </div>
      </div>
    );
  }
}
export default GameCard;