import React, { Component } from 'react';
import image from "../../../images/image.jpg";
import "./slider.css";
import SliderImg from "./SliderImg";


class CardMoreInformation extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      isCharging: this.props.isCharging,
      showModal: this.props.showModal
    }
    this.mySlider = React.createRef();
    this.myButtonPrev = React.createRef();
    this.myButtonNext = React.createRef();
  }
  
  componentDidUpdate(prevProps){
    if(this.props.modalImages  
      !== prevProps.modalImages){    
      const sliderLarg =  this.props.modalImages.length * 100;
      console.log(sliderLarg , this.props.data , "desde el componente did update")
      this.mySlider.current.style.width = sliderLarg.toString() + "%";
      if(sliderLarg === 100){
        this.mySlider.current.style.marginLeft = 0;
      } else if (sliderLarg === 0){
        const myButtonPrev = this.myButtonPrev.current;
        const myButtonNext = this.myButtonNext.current;
        const mySlider = this.mySlider.current;
        
        mySlider.style.display = "none";
        myButtonNext.style.display = "none";
        myButtonPrev.style.display = "none";
      }
    } else if (this.props.data !== prevProps.data){
      this.setState({
        data : this.props.data,
        isCharging: false,
        showModal: true
      })
    }
  }

  // Function that make the slider

  createSlider = data => {
    return data.map((element , index) => { 
      console.log(element.original)
      return ( 
        <SliderImg 
          source={element.original}
          key={index}
        />
      );
    });
  }

  // Function that display the charging component

  setCharging = () =>{
    this.setState({
      isCharging: true
    })
  }
  // Function to see the prev image in slider

  prevImage = () =>{
    const mySlider =this.mySlider.current;
    const lastImage = mySlider.lastChild;
    const firstImage = mySlider.firstChild;
    const button = this.myButtonPrev.current;
    button.disabled = true;
    if(mySlider.children.length > 1){
      mySlider.classList.add("move-left");
      setTimeout(()=>{
        mySlider.classList.remove("move-left");
        lastImage.after(firstImage);
        button.disabled = false;
      } , 900);
      
    } else {
      alert("No hay mas imagenes!")
    }
  }
  
  // Function to see the next image in slider

  nextImage = () =>{
    const mySlider =this.mySlider.current;
    const lastImage = mySlider.lastChild;
    const firstImage = mySlider.firstChild;
    const button = this.myButtonNext.current;
    button.disabled = true;
    if(mySlider.children.length > 1){
      mySlider.classList.add("move-rigth");
      setTimeout(()=>{
        mySlider.classList.remove("move-rigth");
        firstImage.before(lastImage);
        button.disabled = false;
      } , 900)
    } else {
      alert("No hay mas imagenes!")
    }
  }

  render(){
    const showHideClassName = this.props.showModal ? "modal-display-flex" : "modal-display-none";
    const { modalDescription , modalTitle , modalImg } = this.props;

    if(this.props.data !== [] ){
      return (
        <div 
            className={`${showHideClassName} information-modal`}
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
                { modalTitle }
              </h1>
              
              <img 
                className="information-modal-img" 
                src={modalImg} 
                alt="esta es una imagen"
              />
  
              <div 
                className="information-modal-description"
                dangerouslySetInnerHTML={
                  { __html : modalDescription } 
                }
              >
              </div>
            </div>
            
            <div 
              className="slider-container"
              >
                <div 
                  ref={ this.mySlider } 
                  className="slider"
                >
                  {this.createSlider(this.props.modalImages)}
                </div>
                <button 
                  ref={this.myButtonPrev}
                  className="btn-prev"
                  onClick={this.prevImage}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  ref={this.myButtonNext}
                  className="btn-next"
                  onClick={this.nextImage}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
      )
    }  
   
  }
}

export default CardMoreInformation;