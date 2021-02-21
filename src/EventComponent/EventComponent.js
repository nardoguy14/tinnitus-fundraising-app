import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './EventComponent.css';
import AmountRaisedComponent from '../AmountRaisedComponent/AmountRaisedComponent'
import BannerComponent from '../BannerComponent/BannerComponent'
import InfoComponent from "../InfoComponent/InfoComponent";
import InfoDetailsComponent from "../InfoDetailsComponent/InfoDetailsComponent";
import DistanceElapsedComponent from "../DistanceElapsedComponent/DistanceElapsedComponent";
import LeaderBoardComponent from "../LeaderBoardComponent/LeaderBoardComponent";

function EventComponent() {
  return (
      <main style={{padding: "40px"}}>

        <BannerComponent />
        <AmountRaisedComponent />
        <div className="spirit-row">
            <div className="spirit-col-md-7 spirit-col-lg-8">
                <InfoComponent />
            </div>
            <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                <InfoDetailsComponent />
            </div>
        </div>
        <div>
            <DistanceElapsedComponent />
        </div>

        <div>
            <LeaderBoardComponent />
        </div>

      </main>
  );
}

export default EventComponent;
