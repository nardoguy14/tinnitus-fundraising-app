import React from 'react';
import ReactDOM from 'react-dom';
import './BannerComponent.css';
import bootstrap from 'bootstrap';

function BannerComponent() {
  return (

      <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--wide">
        <div className="jdrf-p2p-cover-photo ng-isolate-scope">
          <div className="jdrf-p2p-cover-photo__inner"
               style={{'background-image': 'url("https://www2.jdrf.org/jdrf-framework/dist/walk/images/greeting-page-cover/default.compressed.jpg")'}}>
            <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm">
              <div className="jdrf-p2p-cover-photo__text">
                <h1 className="spirit-h2">
                  <span>JDRF One Walk, Los Angeles 2020</span>
                </h1>
                <div className="jdrf-p2p-cover-photo__subheading">
                  <span>November 1, 2020</span>
                  <span>&nbsp;•&nbsp;</span>
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default BannerComponent;
