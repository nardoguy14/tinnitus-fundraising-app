import React from 'react';
import ReactDOM from 'react-dom';
import './DistanceElapsedComponent.css';
import bootstrap from 'bootstrap';

class DistanceElapsedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "In support of the 1.6 million Americans living with T1D, our miles will be counted towards " +
                         "a collective goal of walking 1.6 million miles.",
            totalDistance: "2,739.05 mi"
        }
    }

    render() {
        let {totalDistance, description} = this.state
        return (
            <div className="jdrf-p2p-greeting__strava-activities">
                <h2 className="spirit-h3">Our Miles Towards Mission</h2>
                <p className="spirit-body-text-l">
                    {description}
                </p>
                <div className="jdrf-p2p-progress-meter-wrap jdrf-p2p-progress-meter-wrap--small js--fitness-progress-meter-wrap ng-scope">
                    <div className="jdrf-p2p-progress-meter ng-isolate-scope jdrf-p2p-progress-meter--no-goal">
                        <div className="clearfix">
                            <div className="jdrf-p2p-progress-meter__achieved clearfix">
                                <div className="jdrf-p2p-progress-meter__amount ng-binding ng-scope">
                                    {totalDistance}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DistanceElapsedComponent;
