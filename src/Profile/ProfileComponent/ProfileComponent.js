import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";
import ProfileAboutComponent from "../ProfileAboutComponent/ProfileAboutComponent";
import ProfileDonorComponent from "../ProfileDonorComponent/ProfileDonorComponent";
import ProfileProgressComponent from "../ProfileProgressComponent/ProfileProgressComponent";
import ProfileDetailsComponent from "../ProfileDetailsComponent/ProfileDetailsComponent";
import ProfileShareAndDonateComponent from "../ProfileShareAndDonateComponent/ProfileShareAndDonateComponent";
import {withRouter} from "react-router";
import TokenService from "../../lib/tokenService";

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search)
        const username = urlParams.get("username")
        this.state = {
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
            usersProfile: TokenService.getClaims()['username'] === username
        }
    }

    componentDidMount() {
        let {username} = this.state

        axios.get(`http://localhost:8000/users?username=`+username)
            .then(res => {
                const user = res.data[0];
                this.setState({
                    fullName: user.firstName + " " + user.lastName,
                    bannerPhoto: "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull",
                    profilePhoto: "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull",
                    name: user.firstName,
                    user_id: user.id,
                    infoHtml: user.description

                })

            axios.get('http://localhost:8000/users/' + user.id + '/fundraisers')
                .then(res => {
                    const fundraiser = res.data[0];
                    if(typeof fundraiser !== 'undefined'){
                        console.log("fundraiser")
                        console.log(fundraiser)
                        this.setState({
                            goalAmount: fundraiser.fundraiser_goal_amount,
                        })

                        axios.get('http://localhost:8000/fundraisers?id=' + fundraiser.fundraiser_id)
                            .then(res => {
                                const fundraiser = res.data[0];
                                this.setState({
                                    eventName: fundraiser.name,
                                    eventUrl: "/event?id=" +fundraiser.id
                                })
                            })


                        axios.get('http://localhost:8000/donations/fundraiser/' + fundraiser.fundraiser_id)
                            .then(res => {
                                const donations = res.data;
                                var sumAmount = 0;
                                var donors = donations
                                    .filter(donation => {
                                        return donation.user_id === user.id
                                    })
                                donors.forEach(donation => sumAmount += donation.amount)
                                donors = donors.map(donor => {
                                    return {
                                        name: donor.donor_first_name + " " + donor.donor_last_name,
                                        amount: donor.amount
                                    }
                                })
                                this.setState({
                                    donors: donors,
                                    amountRaised: sumAmount
                                })
                            })
                    }
                })
        })
    }

    render(){
        let {fullName, bannerPhoto, profilePhoto, name, user_id, amountRaised, goalAmount,
        eventName, eventUrl, infoHtml, donors, usersProfile} = this.state

        return (
          <div style={{padding: "40px"}}>
              <ProfileBannerComponent
                  usersProfile={usersProfile}
                  fullName={fullName}
                  bannerPhoto={bannerPhoto}
                  profilePhoto={profilePhoto}/>
              <div className="jdrf-p2p-page-container">
                  <div className="jdrf-p2p-personal__primary-cta ng-isolate-scope hl-sticky sticky-top sticky-before">
                      <ProfileShareAndDonateComponent
                        usersProfile={usersProfile}
                        name={name}
                        donateUrl={"/donate?user=" + user_id}/>
                  </div>

                  <div className="spirit-row">
                      <div className="spirit-col-md-7 spirit-col-lg-8 jdrf-p2p-personal__left-col">
                          <div className="visible-xs">
                              <ProfileProgressComponent
                                usersProfile={usersProfile}
                                goalAmount={goalAmount}
                                amountRaised={amountRaised}/>

                              <ProfileDetailsComponent
                                usersProfile={usersProfile}
                                eventName={eventName}
                                eventUrl={eventUrl}/>

                          </div>

                          <ProfileAboutComponent
                              usersProfile={usersProfile}
                              name={name}
                              infoHTML={infoHtml}/>

                      </div>
                      <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                          <ProfileProgressComponent
                              usersProfile={usersProfile}
                              goalAmount={goalAmount}
                              amountRaised={amountRaised}/>

                          <ProfileDonorComponent
                                usersProfile={usersProfile}
                                name={name}
                                donors={donors}/>

                          <ProfileDetailsComponent
                              usersProfile={usersProfile}
                              eventName={eventName}
                              eventUrl={eventUrl}/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProfileComponent = withRouter(ProfileComponent);
