import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileProgressComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goalAmount: props.goalAmount,
            amountRaised: props.amountRaised,
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.goalAmount !== this.props.goalAmount ||
            prevProps.amountRaised !== this.props.amountRaised
        ) {
            this.setState({
                goalAmount: this.props.goalAmount,
                amountRaised: this.props.amountRaised
            })
        }
    }

    render(){
        let {amountRaised, goalAmount} = this.state
        let percentage = parseInt(amountRaised/goalAmount * 100)
        return (
            <div className="jdrf-p2p-progress-meter-wrap jdrf-p2p-progress-meter-wrap--small" aria-hidden="false">
                <div className="jdrf-p2p-progress-meter ng-scope ng-isolate-scope">
                    <div className="clearfix">
                        <div className="jdrf-p2p-progress-meter__achieved clearfix">
                            <div className="jdrf-p2p-progress-meter__label">
                                <span className="ng-scope">Raised</span>
                            </div>
                            <div className="jdrf-p2p-progress-meter__amount">${amountRaised}</div>
                        </div>
                        <div className="jdrf-p2p-progress-meter__goal clearfix">
                            <div className="jdrf-p2p-progress-meter__label">Goal</div>
                            <div className="jdrf-p2p-progress-meter__amount ng-binding">${goalAmount}</div>
                        </div>
                    </div>

                    <div className="jdrf-p2p-progress-meter__bar ng-scope">
                        <div className="jdrf-p2p-progress-meter__bar-inner" style={{width: percentage + "%"}}></div>
                    </div>
                    <div className="jdrf-p2p-progress-meter__bottom clearfix ng-scope">
                        <div className="jdrf-p2p-progress-meter__bottom-left">
                                          <span className="ng-scope">
                                              <strong>
                                                  <span>{percentage}</span>%
                                              </strong>
                                          </span>
                        </div>
                        <div className="jdrf-p2p-progress-meter__bottom-right">
                                          <span>
                                              <strong>
                                                  <span>${goalAmount}</span>
                                              </strong>
                                          </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileProgressComponent;
