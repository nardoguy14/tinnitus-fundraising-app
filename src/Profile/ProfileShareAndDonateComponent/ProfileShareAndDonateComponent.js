import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileShareAndDonateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donateUrl: props.donateUrl,
            name: props.name
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.donateUrl !== this.props.donateUrl ||
            prevProps.name !== this.props.name
        ) {
            this.setState({
                donateUrl: this.props.donateUrl,
                name: this.props.name
            })
        }
    }

    render(){
        let {donateUrl, name} = this.state

        return (
            <div>
                <div className="jdrf-p2p-personal__cta-col">
                    <div>
                        <button type="button"
                                className="spirit-button spirit-button--secondary spirit-button--with-icon">Share
                            <svg className="spirit-icon spirit-icon--share spirit-icon--share-right"
                                 aria-hidden="true">
                                <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#share"></use>

                            </svg>
                        </button>
                    </div>
                </div>

                <div className="jdrf-p2p-personal__cta-col jdrf-p2p-personal__cta-col--donate-bottom">

                    <Link className="spirit-button" to={donateUrl}>Donate <span>&nbsp;to&nbsp;<span>{name}</span>
                              </span></Link>
                </div>
            </div>
        );
    }
}

export default ProfileShareAndDonateComponent;
