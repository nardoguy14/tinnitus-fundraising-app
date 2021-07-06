import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileFundraiserComponent.css';
import {FormText, Form, Button, Modal, InputGroup, FormControl, Table} from 'react-bootstrap';
import TokenService from '../../lib/tokenService'
import ProfileProgressComponent from "../ProfileProgressComponent/ProfileProgressComponent";
import ProfileDonorComponent from "../ProfileDonorComponent/ProfileDonorComponent";
import ProfileDetailsComponent from "../ProfileDetailsComponent/ProfileDetailsComponent";
import {
    getFundraiser,
    getFundraisers,
    getFundraisersDonations,
    postLinkUserToFundraiser,
    searchFundraisers
} from "../../lib/apiRequestor";

class ProfileFundraiserComponent extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.user)
        this.state = {
            name: "",
            user: props.user,
            username: props.username,
            showModal: false,
            eventSearchResults: [],
            selectedEventIndex: -1,
            fundraiserExists: false,
            goalAmount: 0,
            amountRaised: 0,
            eventUrl: "",
            eventName: "",
            donors: [],
            usersProfile: TokenService.getClaims()['username'] === props.username
        }
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
            this.getFundraiserDetails(this.props.user)
        }

    }

    componentDidMount() {
        let {user} = this.state
        if(user !== null){
            this.getFundraiserDetails(user)
        }
    }

    getFundraiserDetails(user){
        getFundraisers(user.id)
            .then(res => {
                const fundraiser = res.data[0];
                if(typeof fundraiser !== 'undefined'){
                    this.setState({
                        user: user,
                        name: user.firstName,
                        goalAmount: fundraiser.fundraiser_goal_amount,
                        fundraiserExists: true
                    })

                    getFundraiser(fundraiser.fundraiser_id)
                        .then(res => {
                            const fundraiser = res.data[0];
                            this.setState({
                                eventName: fundraiser.name,
                                eventUrl: "/event?id=" +fundraiser.id
                            })
                        })


                    getFundraisersDonations(fundraiser.fundraiser_id)
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
                                    amount: donor.amount,
                                    message: donor.donor_comment
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
    }

    linkUserToFundraiser() {
        let {selectedEventIndex, eventSearchResults, donationGoalAmount, user} = this.state
        var body = {
            user_id: TokenService.getClaims()['id'],
            fundraiser_id: eventSearchResults[selectedEventIndex].id,
            fundraiser_goal_amount: parseInt(donationGoalAmount)
        }
        postLinkUserToFundraiser(body).then(result => {
            this.setState({showModal: false})
            this.closeModal()
            this.getFundraiserDetails(user)
        })
    }

    closeModal() {
        this.setState({showModal: false})
    }

    showModal() {
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

        searchFundraisers(searchParams)
            .then(res => {
                console.log(res.data)
                const events = res.data;
                this.setState({eventSearchResults: events})
            })
    }

    setSelectedEvent(index) {
        this.setState({selectedEventIndex: index})
    }

    setDonationGoal(donationAmount) {
        this.setState({donationGoalAmount: donationAmount})
    }

    render(){
        let {fundraiserExists, usersProfile, goalAmount, amountRaised, name, donors, eventName, eventUrl,
             eventSearchResults, selectedEventIndex, showModal} = this.state

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

            let eventResults = eventSearchResults.map((event, index) => {
                var color = {}

                if(index === selectedEventIndex){
                    color = {backgroundColor: "#007bff"}
                }

                return (
                    <tr style={color}  onClick={e => {this.setSelectedEvent(index)}} >
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
                        style={{left: "25%", position: 'relative', backgroundColor: 'rgb(59, 92, 173)'}}
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

                            <Form.Label htmlFor="basic-url">Donation Goal</Form.Label>
                            <InputGroup size="lg">
                                <FormControl
                                    onChange={e => {this.setDonationGoal(e.target.value)}}
                                    placeHolder={"$3000.00"}
                                    aria-label="Large"
                                    aria-describedby="inputGroup-sizing-sm" />
                            </InputGroup>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={e => {this.closeModal()}}>
                                Close
                            </Button>
                            <Button
                                style={{backgroundColor: 'rgb(59, 92, 173)'}}
                                variant="primary"
                                onClick={e => {this.linkUserToFundraiser()}} >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        return fundraisingDetails
    }
}

export default ProfileFundraiserComponent;
