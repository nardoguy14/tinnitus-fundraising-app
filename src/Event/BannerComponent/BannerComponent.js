import React from 'react';
import ReactDOM from 'react-dom';
import './BannerComponent.css';
import bootstrap from 'bootstrap';

class BannerComponent extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      backgroundUrl: props.backgroundUrl,
      eventTitle: props.eventTitle
    }
  }

  componentDidUpdate(prevProps) {
    if (
        prevProps.backgroundUrl !== this.props.backgroundUrl ||
        prevProps.eventTitle !== this.props.eventTitle
    ) {
      this.setState({
        backgroundUrl: this.props.backgroundUrl,
        eventTitle: this.props.eventTitle
      })
    }
  }

  render() {
    let {backgroundUrl, eventTitle} = this.state
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
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default BannerComponent;
