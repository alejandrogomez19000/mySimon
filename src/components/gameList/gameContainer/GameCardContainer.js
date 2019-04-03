import React, { Component } from 'react';
import GameCard from '../gameCard/GameCard';
import "./gameCardContainer.css"
import image from "../../../images/image.jpg"
import image1 from "../../../images/image1.jpg";
import image2 from "../../../images/image2.jpg";
import image3 from "../../../images/image3.png";
import CardMoreInformation from '../slider/CardMoreInformation'

const myArray = [image , image1 , image2 , image3 , image ]
class GameCardContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showModal : false
    }
    this.watchMore = this.watchMore.bind(this);
  }

  componentDidUpdate( prevProps , prevState ){
    if(this.props.data !== prevProps.data){
      this.setState({
        data:this.props.data
      })
    }
  }
  watchMore(){ 
    this.setState({
      showModal : true
    })
  }
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  render() {
    return (
      <div className="game-card-container">
        {/* this.props.data !== [] ? 
        this.props.data.map( element => (
          <GameCard key={element[0].id} data={element[0]} />
          )
        )
        : console.log(this.props.data) 
        */} 
        <div 
            className="game-card"
        >
          <div 
              className="game-header"
          >
            <img 
                src={image} 
                alt="Logo" 
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
                      un tiun tituloun titulo un titulo un titulo
                  </h1>
                  <div 
                      className="game-description"
                  >
                      una un titulo un tituloun titulo un titulo un titulo
                  </div>
                </div>
                <div 
                    className="card-button" 
                    onClick={this.watchMore}
                >
                    READ MORE
                </div>
          </div>
        </div>
        <CardMoreInformation 
            data={myArray} 
            closeModal={this.closeModal} 
            showModal={this.state.showModal}
        />
      </div>
    );
  }
}

export default GameCardContainer;