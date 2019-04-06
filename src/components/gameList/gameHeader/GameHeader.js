import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "./logo.png"

class GameHeader extends Component {
  render() {
    return (
      <Link to="./">   
        <nav className="navbar">
          <img src={logo} alt="giant-bomb"/>
        </nav> 
      </Link>
    );
  } 
}

export default GameHeader;