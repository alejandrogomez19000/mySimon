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
    let { description , name , image } = this.state.data;
    if( typeof description === 'string' && description.length < 10 || description === null){
      description = "Oh!! we have not played this game yet!!<br /> Play it and tell us you opinion!!" ;
    }
    return (
      <div 
            className="game-card"
            id={this.props.guid}
        >
          <div 
              className="game-header"
          >
            <img 
                src={image.original_url} 
                alt={name} 
            />
          </div>
          <div 
              className="game-body"
          >
                <div 
                    className="game-information"
                >
                  <h1 
                      className="game-title"
                  >
                      {name}
                  </h1>
                  <div 
                      dangerouslySetInnerHTML={
                        { __html : description } 
                      }
                      className="game-description"
                  >
                  </div>
                </div>
                <div 
                    className="card-button" 
                    onClick={this.props.watchMore}
                >
                    READ MORE
                </div>
          </div>
        </div>
    );
  }
}
export default GameCard;