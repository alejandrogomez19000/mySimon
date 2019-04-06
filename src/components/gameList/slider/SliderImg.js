import React, { Component } from 'react';

class SliderImg extends Component {
  constructor(props){
    super(props);
  }
 
  render() {
    const image = this.props.source;
    return (
        <div
            className="slider-img" 
            key={this.props.alt}>
            <img 
                src={image} 
                alt={this.props.alt}
            />   
        </div>
    );
  }
}

export default SliderImg;