import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import {Button, Modal, InputGroup, FormControl, Table, Form} from 'react-bootstrap'
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";
import ProfileAboutComponent from "../ProfileAboutComponent/ProfileAboutComponent";
import ProfileShareAndDonateComponent from "../ProfileShareAndDonateComponent/ProfileShareAndDonateComponent";
import {withRouter} from "react-router";
import TokenService from "../../lib/tokenService";
import './ProfileComponent.css';
import ProfileFundraiserComponent from "../ProfileFundraiserComponent/ProfileFundraiserComponent";
import {getUserByUsername} from "../../lib/apiRequestor";

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search)
        const username = urlParams.get("username")
        var usersProfile = false
        if(TokenService.getClaims() !== null && TokenService.getClaims()['username'] === username){
            usersProfile = true
        }
        this.state = {
            user: null,
            username: username,
            fullName: "",
            bannerPhoto: "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull",
            profilePhoto: "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull",
            name: "",
            user_id: "",
            goalAmount: 0,
            amountRaised: 0,
            eventName: "",
            eventUrl: "",
            infoHtml: "",
            donors: [],
            usersProfile: usersProfile
        }
    }

    componentDidMount() {
        let {username} = this.state

        getUserByUsername(username)
        .then(res => {
            const user = res.data[0];

            this.setState({
                fullName: user.firstName + " " + user.lastName,
                bannerPhoto: "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull",
                profilePhoto: "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull",
                name: user.firstName,
                user_id: user.id,
                infoHtml:  user.description,
                user: user
            })
            // this.getFundraiserDetails(user)
        })
    }


    render(){

        let {user, username, fullName, bannerPhoto, profilePhoto, name, user_id, infoHtml, usersProfile} = this.state
        return (
          <div style={{padding: "0px"}}>
              <ProfileBannerComponent
                  username={username}
                  usersProfile={usersProfile}
                  fullName={fullName}
                  bannerPhoto={bannerPhoto}
                  profilePhoto={profilePhoto}/>
              <div className="container" style={{
                  position: 'relative',
                  top: '94px',
                  marginBottom: '94px'
              }}>
                  <div className="jdrf-p2p-personal__primary-cta  sticky-top sticky-before">
                      <ProfileShareAndDonateComponent
                        usersProfile={usersProfile}
                        name={name}
                        donateUrl={"/donation?username=" + username}/>
                  </div>

                  <div className="row">
                      <div className="col-sm-12 col-md-7 col-lg-8">
                          <ProfileAboutComponent
                              username={username}
                              usersProfile={usersProfile}
                              name={name}
                              infoHTML={infoHtml}/>

                      </div>
                      <div className=" col-sm-12 col-md-5 col-lg-4">
                          <ProfileFundraiserComponent
                              user={user}
                              username={username}
                          />
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProfileComponent = withRouter(ProfileComponent);
