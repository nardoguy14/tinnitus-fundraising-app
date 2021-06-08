import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import {Button, Modal, InputGroup, FormControl, Table} from 'react-bootstrap'
import axios from 'axios';
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";
import ProfileAboutComponent from "../ProfileAboutComponent/ProfileAboutComponent";
import ProfileDonorComponent from "../ProfileDonorComponent/ProfileDonorComponent";
import ProfileProgressComponent from "../ProfileProgressComponent/ProfileProgressComponent";
import ProfileDetailsComponent from "../ProfileDetailsComponent/ProfileDetailsComponent";
import ProfileShareAndDonateComponent from "../ProfileShareAndDonateComponent/ProfileShareAndDonateComponent";
import {withRouter} from "react-router";
import TokenService from "../../lib/tokenService";
import './ProfileComponent.css';

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
            usersProfile: TokenService.getClaims()['username'] === username,
            showModal: false,
            eventSearchResults: []
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
                            fundraiserExists: true
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
                                    amountRaised: sumAmount,
                                    fundraiserExists: true
                                })
                            })
                    }
                    else{
                        this.setState({fundraiserExists: false})
                    }
                })
        })
    }

    closeModal() {
        console.log(this)
        this.setState({showModal: false})
    }

    showModal() {
        console.log(this)
        this.setState({showModal: true})
    }

    searchEvent(name) {
        var searchParams = []
        if(name === ""){
            this.setState({personSearchResults: []})
            return
        }
        if(name !== "")
            searchParams.push("name=" + name)

        axios.get(`http://localhost:8000/fundraisers?` + searchParams.join("&"))
        .then(res => {
            console.log(res.data)
            const events = res.data;
            this.setState({eventSearchResults: events})
        })
    }

    render(){
        let {fullName, bannerPhoto, profilePhoto, name, user_id, amountRaised, goalAmount,
        eventName, eventUrl, infoHtml, donors, usersProfile,
        fundraiserExists, showModal, eventSearchResults} = this.state

        var fundraisingDetails = null
        if(fundraiserExists){
            fundraisingDetails = (
                <div>
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
            )
        }
        else {

            let eventResults = eventSearchResults.map(event => {
                return (
                    <tr>
                        <td>{event.name}</td>
                        <td>{event.city}</td>
                        <td>{event.state}</td>
                        <td>{event.zip}</td>
                    </tr>
                )
            })


            fundraisingDetails = (
                <div>
                    <Button
                        onClick={e => {this.showModal()}}
                        style={{left: "25%", position: 'relative'}}
                        variant="primary">Add Fundraising Event</Button>

                    <Modal
                        dialogClassName="modal90w"
                        show={showModal}
                        onHide={e => {this.closeModal()}}>
                        <Modal.Header>
                            <Modal.Title>Join Fundraising Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <InputGroup size="lg">
                                <FormControl
                                    onChange={e => {this.searchEvent(e.target.value)}}
                                    placeHolder={"Search..."}
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                </tr>
                                </thead>
                                <tbody>
                                {eventResults}
                                </tbody>
                            </Table>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={e => {this.closeModal()}}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={e => {this.closeModal()}}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }

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
                              {fundraisingDetails}

                          </div>

                          <ProfileAboutComponent
                              usersProfile={usersProfile}
                              name={name}
                              infoHTML={infoHtml}/>

                      </div>
                      <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                          {fundraisingDetails}
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default ProfileComponent = withRouter(ProfileComponent);
