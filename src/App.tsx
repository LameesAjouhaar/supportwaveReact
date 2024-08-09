import React from 'react';
import './App.css';
import { BikeDisplay } from './landing/BikeDisplay';
import pinkBike from './assets/—Pngtree—pink and white motorcycle_14658951 (1).png'


function App() {

  /**render bike component */
  return (
    <div className="App">
      <div className="container">
        <div className="logo">
          <img src={pinkBike} alt="Pink Bike" className="logoImage" />
          <h1 className={"h1Heading"}>Motorbikes</h1>
        </div>
      </div>
      <BikeDisplay />
    </div>
  );
}

export default App;
