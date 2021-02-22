import React from 'react';
import ReactDOM from 'react-dom';
import './AmountRaisedComponent.css';
import bootstrap from 'bootstrap';

class AmountRaisedComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amountRaised: props.amountRaised,
    }
  }

  render() {
    let {amountRaised} = this.state
    return (
        <div className="spirit-row jdrf-p2p-greeting__progress-row">
          <div className="spirit-col-md-7 spirit-col-lg-8 col--vertical-center">
            <div className="jdrf-p2p-progress-meter-wrap">
              <div className="jdrf-p2p-progress-meter ng-isolate-scope jdrf-p2p-progress-meter--no-goal">
                <div className="jdrf-p2p-progress-meter__achieved clearfix">
                  <div className="jdrf-p2p-progress-meter__label">
                    <span className="ng-scope">Raised</span>
                  </div>
                  <div className="jdrf-p2p-progress-meter__amount ng-binding"> {amountRaised}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="spirit-col-md-5 spirit-col-lg-4 col--vertical-center hidden-spirit-xs hidden-spirit-sm">
            <div className="jdrf-p2p-greeting__primary-cta">
              <div className="spirit-row">
                <div className="spirit-col-12 ng-scope">
                  <a className="spirit-button spirit-button--fullwidth">Donate</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default AmountRaisedComponent;
