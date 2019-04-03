import React, { Component } from 'react';
import image from "../../../images/image.jpg";
import "./slider.css";
import SliderImg from "./SliderImg";

class CardMoreInformation extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : this.props.data
    }
    this.mySlider = React.createRef();
  }
  componentDidUpdate(prevProps){
    if(this.props.showModal 
      !== prevProps.showModal){
      const sliderLarg =  this.props.data.length * 100;
      this.mySlider.current.style.width = sliderLarg.toString() + "%";
    }
  }
  createSlider = data => {
    return data.map((element , index) => { console.log(element , "desde el map")
      return ( 
        <SliderImg 
        source={element}
        key={index}/>
      );
    });
  }

  // Function to see the prev image in slider

  prevImage = () =>{
    const mySlider =this.mySlider.current;
    const lastImage = mySlider.lastChild;
    const firstImage = mySlider.firstChild;
   
    mySlider.classList.add("move-left");
    setTimeout(()=>{
      mySlider.classList.remove("move-left");
      lastImage.after(firstImage);
    } , 900);
  }
  // Function to see the next image in slider
  nextImage = () =>{
    const mySlider =this.mySlider.current;
    const lastImage = mySlider.lastChild;
    const firstImage = mySlider.firstChild;

    mySlider.classList.add("move-rigth");
    setTimeout(()=>{
      mySlider.classList.remove("move-rigth");
      firstImage.before(lastImage);
    } , 900)
  }

  render(){
    const showHideClassName = this.props.showModal ? "modal-display-flex" : "modal-display-none";
    return (
      <div 
          className={showHideClassName + " " + "information-modal"}
      >
          <div 
              className="game-information-modal"
          >
            <div 
                className="close-button" 
                onClick={this.props.closeModal}
            >
                X
            </div>

            <h1 
              className="information-modal-title"
            >
              un titulo
            </h1>
            
            <img 
              className="information-modal-img" 
              src={image} 
              alt="esta es una imagen"
            />

            <div 
              className="information-modal-description"
            >
              un tituloun tituloun tituloun titulo
              un tituloun tituloun tituloun tituloun tituloun tituloun titulo
              un tituloun tituloun tituloun tituloun tituloun tituloun tituloun tituloun titulo
            </div>
          </div>
          
          <div 
            className="slider-container"
            >
              <div 
                ref={ this.mySlider } 
                className="slider"
              >
                {this.createSlider(this.props.data)}
              </div>
              <div 
                className="btn-prev"
                onClick={this.prevImage}
              >
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="btn-next"
                onClick={this.nextImage}
              >
                <i className="fas fa-chevron-right"></i>
              </div>
          </div>
      </div>
    );
  }
}

export default CardMoreInformation;