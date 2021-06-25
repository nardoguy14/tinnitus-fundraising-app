import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './SearchComponent.css';
import axios from 'axios';

class SearchPersonComponent extends React.Component {

    searchTypes = {
        PARTICIPENT: "PARTICIPENT",
        TEAM: "TEAM",
        EVENT: "EVENT"
    }

    constructor(props) {
        super(props);
        this.state = {
            searchType: this.searchTypes.PARTICIPENT,
            firstNameSearch: "",
            lastNameSearch: "",
            eventNameSearch: "",
            personSearchResults: [],
            eventSearchResults: []
        }
    }

    componentDidMount() {
    }

    createPersonSearch(firstNameSearch, lastNameSearch) {
        let {personSearchResults} = this.state
        var personSearchResultsHtml = null
        if(personSearchResults.length > 0)
            personSearchResultsHtml = (
                <div>
                    <div className="jdrf-p2p-fundraising-search__result-count"
                         aria-hidden="true">
                        <strong>
                            {personSearchResults.length} <span className="ng-binding"></span> results for
                            <span className="ng-binding"></span> {firstNameSearch}
                        </strong>
                    </div>

                    {this.loadResults(personSearchResults)}
                    <div
                        className="ng-hide" aria-hidden="true">
                    </div>
                    <div className="jdrf-p2p-fundraising-search__result-pagination" aria-hidden="true">
                        <a className="spirit-link">
                            <svg className="spirit-icon" aria-hidden="true">
                                <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-left"></use>
                            </svg>
                            <strong>Previous</strong>
                        </a>
                        Page
                        <span></span> of
                        <span></span>
                        <a className="spirit-link">
                            <strong>Next</strong>
                            <svg className="spirit-icon" aria-hidden="true">
                                <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-right"></use>
                            </svg>
                        </a>
                    </div>
                </div>
            )

        return (
            <div className="jdrf-p2p-fundraising-search--participant" aria-hidden="false">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                                    <label className="spirit-form__label">
                                        First Name
                                    </label>
                                    <div className="spirit-form__input">
                                        <input type="text"
                                               className="spirit-form__input-field ng-pristine ng-untouched ng-valid ng-empty"
                                               name="ng_first_name"
                                               aria-invalid="false"
                                               onChange={e => {this.changeFirstNameSearch(e.target.value)}}
                                               value={firstNameSearch}
                                        />
                                    </div>

                        </div>
                        <div className="col-4">


                                    <label className="spirit-form__label">
                                        Last Name
                                    </label>
                                    <div className="spirit-form__input">
                                        <input type="text"
                                               className="spirit-form__input-field ng-pristine ng-untouched ng-valid ng-empty"
                                               name="ng_last_name"
                                               aria-invalid="false"
                                               value={lastNameSearch}
                                               onChange={e => {this.changeLastNameSearch(e.target.value)}}
                                        />
                                    </div>


                        </div>
                        <div className="col-4">
                            <label className="spirit-form__label">
                                &nbsp;
                            </label>
                            <button onClick={e => {this.searchPerson()}} className="spirit-button">
                                <svg className="spirit-icon">
                                    <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#search"></use>
                                </svg>
                                Search
                            </button>
                        </div>
                    </div>
                </div>


                {personSearchResultsHtml}
        </div>)
    }

    changeFirstNameSearch(name) {
        this.setState({firstNameSearch: name})
    }

    changeLastNameSearch(name) {
        this.setState({lastNameSearch: name})
    }

    searchPerson() {
        let {firstNameSearch, lastNameSearch} = this.state

        var searchParams = []
        if(firstNameSearch === "" && lastNameSearch == ""){
            this.setState({personSearchResults: []})
            return
        }
        if(firstNameSearch !== "")
            searchParams.push("first_name=" + firstNameSearch)
        if(lastNameSearch !== "")
            searchParams.push("last_name=" + lastNameSearch)

        axios.get(`http://localhost:8000/users?` + searchParams.join("&"))
        .then(res => {
            const users = res.data;
            this.setState({personSearchResults: users})
        })
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
        let {firstNameSearch, lastNameSearch} = this.state
        return (
            this.createPersonSearch(firstNameSearch, lastNameSearch)
        );
    }
}

export default SearchPersonComponent;
