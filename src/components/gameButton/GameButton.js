import React, { Component } from 'react';
import "./GameButton.css";

class GameButton extends Component {
  constructor(props){
    super(props)
    this.button = React.createRef();
  }
  componentDidMount(){
   this.button.current.classList.add(`btn-waiting`)
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.isPressed !== this.props.isPressed){
      const button = this.button.current;
      this.props.isPressed && this.props.id === this.props.buttonPressed 
      ? button.classList.add(`btn-pressed-${this.props.id}`)
      : button.classList.remove(`btn-pressed-${this.props.id}`)
    }
  }
  render() {
    return (
      <button 
        className="btn" 
        ref={this.button} 
        disabled 
        id={this.props.id}>
      </button>
    );
  }
}

export default GameButton;