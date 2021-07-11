import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './SearchComponent.css';
import axios from 'axios';
import {searchFundraisers} from "../../lib/apiRequestor";

class SearchEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            eventNameSearch: "",
            eventSearchResults: []
        }
    }

    loadEventName(event) {
        return (
            <div className="jdrf-p2p-leaderboard__item-object-avatar-container">
                <div className="jdrf-p2p-leaderboard__item-object-name">
                    <a className="spirit-link" href={"event?id=" + event.id}>
                        <strong>
                            <span className="ng-binding">{event.name}</span>
                        </strong>
                    </a>
                </div>
            </div>
        )
    }

    loadLocation(event) {
        return (
            <div className="jdrf-p2p-leaderboard__item-object-avatar-container">
                <div className="jdrf-p2p-leaderboard__item-object-name">
                    {event.city} {event.state}, {event.zip}
                </div>
            </div>
        )
    }

    loadLink() {
        return (
            <a className="spirit-link"
               href="https://www2.jdrf.org/site/Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_ID=1441477&amp;PROXY_TYPE=20">
                <strong>Donate</strong>
                <svg className="spirit-icon">
                    <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-right"></use>
                </svg>
            </a>
        )
    }

    eventLoadResults(events) {
        if(events.length === 0)
            return null
        let {eventNameSearch} = this.state
        let eventsResults = events.map(event => {
            console.log(event)
            return (
                <tr>
                    <td>
                        {this.loadEventName(event)}
                    </td>
                    <td>
                        {this.loadLocation(event)}
                    </td>
                    <td>
                        {this.loadLink()}
                    </td>
                </tr>
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
                <div className={"table-responsive"}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                eventsResults
                            }
                        </tbody>
                    </table>
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

        searchFundraisers(searchParams)
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
                                    style={{backgroundColor: 'rgb(59, 92, 173)', color: 'white'}}
                                    type="submit"
                                    className="btn"
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

    render(){
        return (
            this.createEventSearch()
        );
    }
}

export default SearchEventComponent;
