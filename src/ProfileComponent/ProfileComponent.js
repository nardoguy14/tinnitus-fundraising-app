import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {}

    render(){
        return (
          <div style={{padding: "40px"}}>
              <ProfileBannerComponent />

          </div>
        );
    }
}

export default ProfileComponent;
