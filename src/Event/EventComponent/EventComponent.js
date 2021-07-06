import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './EventComponent.css';
import AmountRaisedComponent from '../AmountRaisedComponent/AmountRaisedComponent'
import BannerComponent from '../BannerComponent/BannerComponent'
import InfoComponent from "../InfoComponent/InfoComponent";
import InfoDetailsComponent from "../InfoDetailsComponent/InfoDetailsComponent";
import DistanceElapsedComponent from "../DistanceElapsedComponent/DistanceElapsedComponent";
import LeaderBoardComponent from "../LeaderBoardComponent/LeaderBoardComponent";
import {withRouter} from "react-router";
import moment from 'moment';
import {getActivities, getFundraiser, getFundraisersDonations} from "../../lib/apiRequestor";


class EventComponent extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search)
        const eventId = urlParams.get("id")
        this.state = {
            eventId: eventId,
            backgroundUrl: "https://www2.jdrf.org/jdrf-framework/dist/walk/images/greeting-page-cover/default.compressed.jpg",
            eventTitle: "JDRF One Walk, Los Angeles 2020",
            eventDate: "November 1, 2020",
            eventLocation: "Los Angeles, CA",
            amountRaised: "$485,169",
            details: [
                {
                tabTitle: "Event Day Details",
                content: (<div>
                    <div className="spirit-long-form-text">
                        <div className="ng-binding">
                            <div>
                                <div className="manageable-editor">
                                    <div className="page-body-content">
                                        <h3 style={{'text-align': 'center'}}>
                                            <span style={{'font-size': 1.17 + 'em'}}>Celebration Day Schedule:</span>
                                        </h3>
                                        <p style={{'text-align': 'center'}}>6:00am - Festival Doors Open</p>
                                        <p style={{'text-align': 'center'}}>8:00am - Partner Pavilion Open</p>
                                        <p style={{'text-align': 'center'}}>8:00am– 11:00pm - Brand Ambassadors Available</p>
                                        <p style={{'text-align': 'center'}}>8:00am - Roblox Game Live Streaming</p>
                                        <p style={{'text-align': 'center'}}>12:00 pm – One Walk National Ceremony</p>
                                        <p style={{'text-align': 'center'}}><span>*Pacific Standard Time</span></p>
                                        <h3><span style={{'font-size': 1.17 + 'em'}}><br/></span></h3>
                                        <h3><span style={{'font-size': 1.17 + 'em'}}>Miles Towards Mission Challenge</span></h3>
                                        <div>We may not be together in person this year, but we will still come together as one
                                            community to walk 1.6M miles for the 1.6M Americans living with T1D. Join walkers from all
                                            over the country for an unforgettable nation-wide effort that unites us no matter where we
                                            are.&nbsp; You set the pace, the place, the number of miles and the dollars you raise with
                                            friends, family and colleagues. Together, we can improve lives and change the future for
                                            everyone living with this disease.&nbsp;</div>
                                        <h3>Event Day -- The Finish Line Festival</h3>
                                        <div>On November 1, for the first time ever, we will come together as a global community for
                                            the Finish Line Festival. The Festival is the largest T1D focused event ever held, and
                                            celebrates and recognizes teams and individuals for their fundraising and Miles Toward
                                            Mission accomplishments. November 1st is T1D Day and we can think of no better way to
                                            celebrate than with our entire JDRF and T1D community! History in the making!<br/><br/>
                                        </div>
                                        <div>The Finish Line Festival will showcase our national and local T1D community -- from
                                            walkers to corporate partners. It will have t-shirt galleries, a virtual mile of hope,
                                            selfie walls, partner pavilions, instant messaging and top fundraising recognition.
                                            <div>&nbsp;</div>
                                            <div><span>During the afternoon, we will all come together for the One Walk National Ceremony broadcast, where JDRF will highlight all the stories about why we walk, how far we have come and celebrate the unstoppable power of the JDRF ONE Walk Community.</span>
                                            </div>
                                            <br/>
                                            <h3>JDRF One Walk Strava Integration</h3>
                                            <div>Strava, a social-fitness network that tracks cycling, running and walking
                                                activities, is now integrated with your Participant Center so you can see the distance
                                                we will walk together in pursuit of our collective goal of walking 1.6 million miles
                                                by November 1st.
                                            </div>
                                            <div>
                                                <p>&nbsp;</p>
                                            </div>
                                            <h3>2020 One Walk t-shirt&nbsp;</h3>
                                            <p>Walkers that fundraise $100 for JDRF will be mailed the 2020 shirt.</p>
                                            <p></p>
                                            <h3>Walk in a Box&nbsp;</h3>
                                            <div>Teams that raise $5,000 will receive a JDRF One Walk In A Box before November
                                                1st.
                                            </div>
                                            <div>&nbsp;</div>
                                            <div>&nbsp;</div>
                                            <h3>Mile of Hope</h3>
                                            <div>The Mile of Hope is a special way to recognize all our One Walk teams that have
                                                raised $100+ by October 12, 2020. This exclusive group includes family, school and
                                                coporate teams. Teams reaching the Mile of Hope will be recognized during the Finish
                                                Line Festival.
                                            </div>
                                            <div>&nbsp;</div>
                                            <div>&nbsp;</div>
                                            <h3>VIP&nbsp;</h3>
                                            <p>V1P status is exclusively awarded to JDRF One Walk fundraisers who individually raise
                                                $1,000 or more. To celebrate your dedication to raising money for T1D research, you'll
                                                receive a special 2020 One Walk V1P t-shirt, a V1P lanyard and badge and V1P award.
                                                V1Ps will also be recognized during the Finish Line Festival on November 1.&nbsp;<span
                                                    style= {{'font-size': '10pt'}}>&nbsp;</span></p>
                                            <h3>T-Shirt Gallery</h3>
                                            <div>Teams will have the opportunity to display their team t-shirts n the T-shirt
                                                Gallery. Here you can display your favorite t-shirt from the past or the one this
                                                year.
                                            </div>
                                            <div>&nbsp;</div>
                                            <h3>In-Game Experience with Roblox</h3>
                                            <div>Experience the first-ever JDRF gaming collaboration with Roblox! Explore the One
                                                Walk site through the gaming environment with your team members and friends, just as
                                                you would at your local One Walk.
                                            </div>
                                            <div>&nbsp;</div>
                                            <h3>Partner Pavilion</h3>
                                            <div>Meet with local and national vendors in the Partner Pavilion. Participants will
                                                have the opportunity to connect virtually with vendors to ask question and learn about
                                                new products.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                },
                {
                    tabTitle: "Walk News",
                    content: (<div className="ng-scope ng-isolate-scope">
                        <div className="spirit-long-form-text ng-scope">
                            <div className="ng-binding">
                                <div id="FrNews_ArticlePage">
                      <span id="page_body_container"><div>&nbsp;</div>
                        <div>yo hows it going</div>
                      </span>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            ],
            startDate: "November 1, 2020",
            startTime: "6 AM PST",
            site: "https://jdrfonewalk.virtualeventsite.com/southernca",
            contactPerson: "Sue Pietrzak",
            contactEmail: "abc@me.com",
            contactPhone: "(760) 791-3504",
            description: "In support of the 1.6 million Americans living with T1D, our miles will be counted towards a collective goal of walking 1.6 million miles.",
            totalDistance: "2,739.05 mi",
            people: [
                {
                    fullName: "Nardo A",
                    amount: 3000,
                    imageUrl: 'https://www2.jdrf.org/images/friendraiser_uploads/8151.1893058374.customnull'
                }
            ]
        }
    }

    componentDidMount() {
        let {eventId} = this.state
        if(eventId !== null){
            getFundraiser(eventId)
                .then(res => {
                    const fundraiser = res.data[0];
                    console.log(fundraiser)
                    let startDate = moment(Date.parse(fundraiser.date_start)).format('dddd MMMM Do YYYY')
                    let startTime = moment(Date.parse(fundraiser.date_start)).format("h:mm:ss a")

                    this.setState({
                        eventTitle: fundraiser.name + '\n' +fundraiser['description'],
                        eventDate: fundraiser['date_start'] + "-" + fundraiser['date_end'],
                        eventLocation: fundraiser.address + ' ' + fundraiser.city + + ' ' + fundraiser.state + ' ' + fundraiser.zip,
                        details: fundraiser.details.map(detail => {
                            return {
                                tabTitle: detail.title,
                                content: detail.detail
                            }
                        }),
                        startDate: startDate,
                        startTime: startTime,
                        people: fundraiser.people.map(person => {
                            return {
                                username: person.user.username,
                                fullName: person.user.first_name + ' ' + person.user.last_name,
                                amount: person.amount,
                                imageUrl: 'https://www2.jdrf.org/images/friendraiser_uploads/8151.1893058374.customnull'
                            }
                        }),
                        contactPerson: fundraiser.contact.name,
                        contactEmail: fundraiser.contact.email,
                        contactPhone: fundraiser.contact.phone_number

                    })
                })
            getFundraisersDonations(eventId)
                .then(res => {
                    const donations = res.data;
                    console.log(donations)

                    var sum = 0
                    donations.forEach(donation =>{
                        sum += donation.amount
                    })
                    this.setState({
                        amountRaised: "$" + sum
                    })
                })
            getActivities(eventId)
                .then(res => {
                    const activities = res.data;
                    console.log(activities)

                    var sum = 0
                    activities.forEach(activity =>{
                        sum += activity.distance
                    })
                    this.setState({
                        totalDistance: sum + " mi"
                    })
                })
        }
    }

    render(){
        let {
            backgroundUrl, eventTitle, eventDate, eventLocation, amountRaised, details,
            startDate, startTime, contactPerson, contactEmail, contactPhone,
            description, totalDistance, people
        } = this.state

        return (
          <div style={{padding: "40px"}}>
              <BannerComponent
                  backgroundUrl={backgroundUrl}
                  eventTitle={eventTitle}
                  eventDate={eventDate}
                  eventLocation={eventLocation}/>
              <AmountRaisedComponent
                  amountRaised={amountRaised}/>
              <div className="spirit-row">
                  <div className="spirit-col-md-7 spirit-col-lg-8">
                      <InfoComponent info={details}/>
                  </div>
                  <div className="spirit-col-md-5 spirit-col-lg-4 hidden-spirit-xs hidden-spirit-sm">
                      <InfoDetailsComponent
                          startDate={startDate}
                          startTime={startTime}
                          contactPerson={contactPerson}
                          contactEmail={contactEmail}
                          contactPhone={contactPhone}
                      />
                  </div>
              </div>
              <div>
                  <DistanceElapsedComponent
                      description={description}
                      totalDistance={totalDistance}/>
              </div>

              <div>
                  <LeaderBoardComponent people={people}
                    filteredPeople={people}/>
              </div>s

          </div>
        );
    }
}

export default EventComponent = withRouter(EventComponent);
