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

class ProfileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            donors: []
        }
    }

    componentDidMount() {


        axios.get(`http://localhost:8000/users?first_name=nardo3`)
            .then(res => {
                const user = res.data[0];
                this.setState({
                    fullName: user.first_name + " " + user.last_name,
                    bannerPhoto: "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull",
                    profilePhoto: "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull",
                    name: user.first_name,
                    user_id: user.id,
                    infoHtml: user.description

                })

            axios.get('http://localhost:8000/users/' + user.id + '/fundraisers')
                .then(res => {
                        const fundraiser = res.data[0];
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
                })
        })




    }

    render(){
        let {fullName, bannerPhoto, profilePhoto, name, user_id, amountRaised, goalAmount,
        eventName, eventUrl, infoHtml, donors} = this.state
        return (
          <div style={{padding: "40px"}}>
              <ProfileBannerComponent
                  fullName={fullName}
                  bannerPhoto={bannerPhoto}
                  profilePhoto={profilePhoto}/>
              <div className="jdrf-p2p-page-container">
                  <div className="jdrf-p2p-personal__primary-cta ng-isolate-scope hl-sticky sticky-top sticky-before">
                      <ProfileShareAndDonateComponent
                        name={name}
                        donateUrl={"/donate?user=" + user_id}/>
                  </div>

                  <div className="spirit-row">
                      <div className="spirit-col-md-7 spirit-col-lg-8 jdrf-p2p-personal__left-col">
                          <div className="visible-xs">
                              <ProfileProgressComponent
                                goalAmount={goalAmount}
                                amountRaised={amountRaised}/>

                              <ProfileDetailsComponent
                                eventName={eventName}
                                eventUrl={eventUrl}/>

                          </div>

                          <ProfileAboutComponent
                              name={name}
                              infoHTML={infoHtml}/>

                      </div>
                      <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                          <ProfileProgressComponent
                              goalAmount={goalAmount}
                              amountRaised={amountRaised}/>

                          <ProfileDonorComponent
                                name={name}
                                donors={donors}/>

                          <ProfileDetailsComponent
                              eventName={eventName}
                              eventUrl={eventUrl}/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProfileComponent;
