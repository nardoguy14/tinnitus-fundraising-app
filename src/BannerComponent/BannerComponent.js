import React from 'react';
import ReactDOM from 'react-dom';
import './BannerComponent.css';
import bootstrap from 'bootstrap';

class BannerComponent extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      backgroundUrl: "https://www2.jdrf.org/jdrf-framework/dist/walk/images/greeting-page-cover/default.compressed.jpg",
      eventTitle: "JDRF One Walk, Los Angeles 2020",
      eventDate: "November 1, 2020",
      eventLocation: "Los Angeles, CA"
    }
  }

  render() {
    let {backgroundUrl, eventTitle, eventDate, eventLocation} = this.state
    return (
      <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--wide">
          <div className="jdrf-p2p-cover-photo ng-isolate-scope">
            <div className="jdrf-p2p-cover-photo__inner"
                 style={{'background-image': 'url(' + backgroundUrl + ')'}}>
              <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm">
                <div className="jdrf-p2p-cover-photo__text">
                  <h1 className="spirit-h2">
                    <span>{eventTitle}</span>
                  </h1>
                  <div className="jdrf-p2p-cover-photo__subheading">
                    <span>{eventDate}</span>
                    <span>&nbsp;•&nbsp;</span>
                    <span>{eventLocation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default BannerComponent;
