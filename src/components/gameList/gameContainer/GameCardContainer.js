import React, { Component } from 'react';
import GameCard from '../gameCard/GameCard';
import "./gameCardContainer.css";
import CardMoreInformation from '../slider/CardMoreInformation';
import ChargeScreen from "../chargeScreen/ChargeScreen";
import GameHeader from "../gameHeader/GameHeader";

class GameCardContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showModal : false,
      informationModal: [],
      modalImages: [],
      modalDescription:null,
      modalTitle:null,
      modalImg: null,
      isCharging: false
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
  watchMore(e){ 
    this.setState({
      isCharging: true
    })
    const guid = e.target.parentElement.parentElement.id ;
    const title = e.target.parentElement.children[0].children[0].innerText;
    const desc = e.target.parentElement.children[0].children[1].innerText;
    const image = e.target.parentElement.parentElement.children[0].children[0].src;
    this.props.get(`https://cors-anywhere.herokuapp.com/https://www.giantbomb.com/api/game/${guid}/?format=json&api_key=7abd6dcdd73de03a0888b1e13cb57c651ce1b0c7`)
      .then((result) =>{
       this.setState({
        informationModal: result.results,
        modalImages : result.results.images,
        modalTitle: title,
        modalDescription: desc,
        modalImg: image,
        showModal : true,
        isCharging: false
      })
    })
    window.scrollTo(0, 0);
  }
  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  render() {
    const hideGameContainer = this.props.showCards ? "game-card-display-flex" : "game-card-display-none"
    return (
      <div 
          className={ hideGameContainer + " " + "game-card-container"}
      >
         <GameHeader />
        { this.props.data !== [] ? 
        this.props.data.map( element => (
          <GameCard 
              guid={element[0].guid}
              key={element[0].id} 
              data={element[0]} 
              watchMore={this.watchMore}
            />
          )
        )
        : console.log(this.props.data) 
        } 
        
        <CardMoreInformation 
            data={this.state.informationModal} 
            closeModal={this.closeModal} 
            showModal={this.state.showModal}
            modalImages={this.state.modalImages}
            modalDescription={this.state.modalDescription}
            modalTitle={this.state.modalTitle}
            modalImg={this.state.modalImg}
        />
        <ChargeScreen
            isCharging={this.state.isCharging} 
        />
      </div>
    );
  }
}

export default GameCardContainer;