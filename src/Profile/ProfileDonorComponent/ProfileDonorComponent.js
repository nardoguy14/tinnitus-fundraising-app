import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileDonorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            donors: props.donors
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.name !== this.props.name ||
            JSON.stringify(prevProps.donors) !== JSON.stringify(this.props.donors)
        ) {
            this.setState({
                name: this.props.name,
                donors: this.props.donors
            })
        }
    }

    mapDonors() {
        let {donors} = this.state
        let donations = donors.map(donor => {
            return (
                <div className="jdrf-p2p-personal__donor-list-item">
                    <div className="jdrf-p2p-personal__donor-name">
                      <strong>
                          <span >{donor.name}</span>
                      </strong>
                    </div>
                    <div className="jdrf-p2p-personal__donor-amount">${donor.amount}</div>
                    <div style={{ lineHeight: 2.5, fontSize: '20px'}}>{donor.message}</div>
                </div>
            )
        })
        return donations
    }

    render(){
        let {name} = this.state
        let donations = this.mapDonors()
        return (
            <div className="jdrf-p2p-personal__donor-list ng-scope">
                <h2 className="spirit-h6">
                    <span className="ng-binding">{name}'s</span> Donors
                </h2>


                {donations}

                <div className="jdrf-p2p-personal__donor-list-footer ng-scope">
                    <a className="spirit-link" >
                        <strong>View All
                            <span className="ng-binding"> {donations.length} </span>
                            Donors
                        </strong>
                    </a>
                </div>

            </div>
        );
    }
}

export default ProfileDonorComponent;
