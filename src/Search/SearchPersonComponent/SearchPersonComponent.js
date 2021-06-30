import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './SearchComponent.css';
import axios from 'axios';
import {Link} from "react-router-dom";

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
            const users = res.data
            console.log(users)
            let usersWithImagesPromises = users.map( user => {
                return axios.get('http://localhost:8000/users/' +user.username+ '/photos/profile').then(res => {
                    let userImage = 'data:image/png;base64,' + res.data
                    user.image = userImage
                    return user
                })
            })
            Promise.all(usersWithImagesPromises).then(users => {

                let usersWithFundraisersPromises = users.map(user => {
                    return axios.get('http://localhost:8000/users/'+user.id+'/fundraisers').then(result =>{
                        console.log(result.data)
                        if(result.data.length > 0){
                            user.fundraiser = result.data[0].fundraiser[0].name
                        }
                        else {
                            user.fundaraiser = "WEEEE"
                        }
                        return user
                    })
                })
                Promise.all(usersWithFundraisersPromises).then(completeUsers => {
                    console.log(completeUsers)
                    this.setState({personSearchResults: completeUsers})
                })
            })
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
                                <Link to={"profile?username=" + user.username}>
                                    <span className="jdrf-p2p-leaderboard__item-avatar-photo">
                                        <span className="jdrf-p2p-leaderboard__item-avatar-photo-inner">
                                            <span className="jdrf-p2p-leaderboard__item-avatar-photo-image"
                                                  style={{'background-image': 'url("' + user.image + '")'}}>

                                            </span>
                                        </span>
                                    </span>
                                </Link>
                            </div>
                            <div className="jdrf-p2p-leaderboard__item-object-name">
                                <div>
                                    <a className="spirit-link" href={"profile?username=" + user.username}>
                                        <strong>
                                            <span className="ng-binding">{user.firstName} {user.lastName}</span>
                                        </strong>
                                    </a>
                                </div>
                            </div>
                            <div className="jdrf-p2p-responsive-table__row-actions ">
                            </div>
                        </div>
                    </div>
                    <div className="jdrf-p2p-responsive-table__column">
                        <span >{user.fundraiser ? user.fundraiser : "None yet!"}</span>
                    </div>
                    <div className="jdrf-p2p-responsive-table__column ">
                        <div className="jdrf-p2p-responsive-table__row-actions">
                            <Link className="spirit-link"
                               to={"/donation?username=" + user.username }>
                                <strong>Donate</strong>
                                <svg className="spirit-icon">
                                    <use href="../jdrf-framework/dist/spirit/icons/spirit.svg#chevron-right"></use>
                                </svg>
                            </Link>
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
