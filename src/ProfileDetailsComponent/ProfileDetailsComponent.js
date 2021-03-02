import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileDetailsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventName: props.eventName,
            eventUrl: props.eventUrl
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.eventName !== this.props.eventName ||
            prevProps.eventUrl !== this.props.eventUrl
        ) {
            this.setState({
                eventName: this.props.eventName,
                eventUrl: this.props.eventUrl
            })
        }
    }

    render(){
        let {eventName, eventUrl} = this.state
        return (
            <div className="jdrf-p2p-page-details">
                <div className="spirit-list">
                    <div className="spirit-list-item spirit-list-item--avatar">
                        <div className="spirit-list-item__avatar">
                            <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true">
                                <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#calendar"></use>
                            </svg>
                        </div>
                        <div className="spirit-list-item__content">
                            <div className="spirit-list-item__title">
                                {eventName}
                            </div>
                            <div className="spirit-list-item__links-contain">
                                <a className="spirit-list-item__link" href={eventUrl}>
                                    View Event Page
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileDetailsComponent;
