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
            fullName: "Nardo A.",
            bannerPhoto: "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull",
            profilePhoto: "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull",
            name: "Nardo",
            user_id: "123",
            goalAmount: 1000,
            amountRaised: 500,
            eventName: "JDRF One Walk, Western Massachusetts 2020",
            eventUrl: "HELLOABC123",
            infoHtml: (<div className="js--page-rich-text-container">
                <p>Hello! Thank you for taking the
                    time to visit&nbsp;our page for <strong><span
                        className="jqte-fix">B4 Bombers </span></strong>- our walk team, in
                    support of our son, Jack, and daughter, Emily, and their ongoing fight against
                    Juvenile Diabetes. &nbsp;<br/><br/>Type 1, or juvenile diabetes, is a
                    devastating disease that affects millions of people, a large and growing
                    percentage of them children.<br/><br/>There is some good news, though. JDRF
                    is our best hope for finding a cure. It funds more type 1 diabetes
                    research than any other charity worldwide and it's making progress
                    along many promising paths toward better treatments and a
                    cure.<br/><br/>Now, more than ever, you can make a crucial difference.
                    Won't you please give to JDRF as generously as possible? Together,
                    we can make the cure a reality!&nbsp; Please consider joining and
                    sponsoring our team, <strong><span
                        className="jqte-fix">B4 Bombers&nbsp;</span></strong>or
                    any&nbsp;of our individual team members,&nbsp;as I know it will
                    make a personal difference to our family.&nbsp; Thank you for your
                    generosity.&nbsp;</p><p>Kevin, Lauren, Emily, and Jack Brayton</p>
            </div>),
            donors: [
                {
                    name: "nardo",
                    amount: "5000"
                },
                {
                    name: "keben",
                    amount: "200"
                }
            ]
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/users?first_name=nardo3`)
            .then(res => {
                const fundraiser = res.data[0];
                console.log(fundraiser)
                this.setState({})
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
                                eventUrl={"TR?" + eventUrl}/>

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
                              eventUrl={"TR?" + eventUrl}/>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProfileComponent;
