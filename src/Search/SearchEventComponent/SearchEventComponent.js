import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './SearchComponent.css';
import axios from 'axios';

class SearchEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventNameSearch: "",
            eventSearchResults: []
        }
    }

    eventLoadResults(events) {
        if(events.length === 0)
            return null
        let {eventNameSearch} = this.state
        let eventsResults = events.map(event => {
            console.log(event)
            return (
                <div>
                    <div className="jdrf-p2p-responsive-table__row jdrf-p2p-responsive-table__row--avatar ng-scope">
                        <div className="jdrf-p2p-responsive-table__column">
                            <div className="jdrf-p2p-leaderboard__item-object-avatar-container">
                                <div className="jdrf-p2p-leaderboard__item-object-name">
                                    <a className="spirit-link" href={"event?id=" + event.id}>
                                        <strong>
                                            <span className="ng-binding">{event.name}</span>
                                        </strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="jdrf-p2p-responsive-table__column">
                            <div className="jdrf-p2p-leaderboard__item-object-avatar-container">
                                <div className="jdrf-p2p-leaderboard__item-object-name">
                                    {event.city} {event.state}, {event.zip}
                                </div>
                            </div>
                        </div>
                        <div className="jdrf-p2p-responsive-table__column ">
                            <div className="jdrf-p2p-responsive-table__row-actions">
                                <a className="spirit-link"
                                   href="https://www2.jdrf.org/site/Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_ID=1441477&amp;PROXY_TYPE=20">
                                    <strong>Donate</strong>
                                    <svg className="spirit-icon">
                                        <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-right"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        console.log(eventsResults)
        return (
            <div>
                <div className="jdrf-p2p-fundraising-search__result-count" aria-hidden="true">
                    <strong>
                        { events.length} <span className="ng-binding"></span> results for
                        <span className="ng-binding"></span> {eventNameSearch}
                    </strong>
                </div>
                <div className="jdrf-p2p-responsive-table jdrf-p2p-responsive-table--with-dividers">
                    <div className="jdrf-p2p-responsive-table__header">
                        <div className="jdrf-p2p-responsive-table__row">
                            <div className="jdrf-p2p-responsive-table__column">Name</div>
                            <div className="jdrf-p2p-responsive-table__column">Location</div>
                            <div className="jdrf-p2p-responsive-table__column"></div>
                        </div>
                    </div>
                    <div className="jdrf-p2p-responsive-table__body">
                        {
                            eventsResults
                        }
                    </div>
                </div>
            </div>
        )
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

    changeEventSearchValue(name) {
        this.setState({eventNameSearch: name})
    }

    createEventSearch() {
        let {eventSearchResults, eventNameSearch} = this.state


        return (
            <div className="jdrf-p2p-fundraising-search--event ng-hide" aria-hidden="true">


                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <label className="spirit-form__label">
                                    Name
                                </label>
                                <input type="text"
                                       className="spirit-form__input-field"
                                       name="ng_starting_postal"
                                       aria-invalid="false"
                                       onChange={ e => {this.changeEventSearchValue(e.target.value)}}
                                       value={eventNameSearch}
                                />
                            </div>



                            <div className="col-6">
                                <label className="spirit-form__label">
                                    &nbsp;
                                </label>
                                <button
                                    type="submit"
                                    className="spirit-button"
                                    onClick={e => {this.searchEvent(eventNameSearch)}}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>






                {this.eventLoadResults(eventSearchResults)}
            </div>)
    }

    loadResults(users) {
        let userResults = users.map(user => {
            console.log(user)
            return (<div className="jdrf-p2p-responsive-table__body">
                <div className="jdrf-p2p-responsive-table__row jdrf-p2p-responsive-table__row--avatar ng-scope">
                    <div className="jdrf-p2p-responsive-table__column">
                        <div className="jdrf-p2p-leaderboard__item-object-avatar-container">
                            <div
                                className="jdrf-p2p-leaderboard__item-avatar">
                                <a className="ng-scope" href={"profile?username=" + user.username}>
                                    <span className="jdrf-p2p-leaderboard__item-avatar-photo">
                                        <span className="jdrf-p2p-leaderboard__item-avatar-photo-inner">
                                            <span className="jdrf-p2p-leaderboard__item-avatar-photo-image">

                                            </span>
                                        </span>
                                    </span>
                                </a>
                            </div>
                            <div className="jdrf-p2p-leaderboard__item-object-name">
                                <div>
                                    <a className="spirit-link" href={"profile?username=" + user.username}>
                                        <strong>
                                            <span className="ng-binding">{user.first_name} {user.last_name}</span>
                                        </strong>
                                    </a>
                                </div>
                            </div>
                            <div className="jdrf-p2p-responsive-table__row-actions ">
                            </div>
                        </div>
                    </div>
                    <div className="jdrf-p2p-responsive-table__column">
                        <span className="ng-binding">Western Massachusetts 2020</span>
                    </div>
                    <div className="jdrf-p2p-responsive-table__column ">
                        <div className="jdrf-p2p-responsive-table__row-actions">
                            <a className="spirit-link"
                               href="https://www2.jdrf.org/site/Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_ID=1441477&amp;PROXY_TYPE=20">
                                <strong>Donate</strong>
                                <svg className="spirit-icon">
                                    <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-right"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>)
        })
        console.log(userResults)
        return (
            <div className="jdrf-p2p-responsive-table jdrf-p2p-responsive-table--with-dividers">
                <div className="jdrf-p2p-responsive-table__header">
                    <div className="jdrf-p2p-responsive-table__row">
                        <div className="jdrf-p2p-responsive-table__column">Name</div>
                        <div
                            className="jdrf-p2p-responsive-table__column hidden-xs">
                            <span>Event</span>
                        </div>
                        <div className="jdrf-p2p-responsive-table__column"></div>
                    </div>
                </div>
                {
                    userResults
                }
            </div>
        )

    }

    render(){
        return (
            this.createEventSearch()
        );
    }
}

export default SearchEventComponent;
