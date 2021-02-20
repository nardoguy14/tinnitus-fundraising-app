import React from 'react';
import ReactDOM from 'react-dom';
import './EventComponent.css';
import AmountRaisedComponent from '../AmountRaisedComponent/AmountRaisedComponent'
import BannerComponent from '../BannerComponent/BannerComponent'
import bootstrap from 'bootstrap';

function EventComponent() {
  return (
      <main style={{padding: "40px"}}>

        <BannerComponent />
        <AmountRaisedComponent />


      </main>
  );
}

export default EventComponent;
