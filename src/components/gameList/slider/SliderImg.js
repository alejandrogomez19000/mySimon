import React, { Component } from 'react';

class SliderImg extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <div
            className="slider-img" 
            key={this.props.alt}>
            <img 
                src={this.props.source} 
                alt={this.props.alt}
            />
        </div>
    );
  }
}

export default SliderImg;