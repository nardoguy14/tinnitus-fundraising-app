import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './SearchComponent.css';
import axios from 'axios';
import SearchPersonComponent from "../SearchPersonComponent/SearchPersonComponent";
import SearchEventComponent from "../SearchEventComponent/SearchEventComponent";

class SearchComponent extends React.Component {

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

    changeSearchType(searchType) {
        this.setState({searchType: searchType})
    }

    render(){
        let {searchType} = this.state
        var body = null
        if(searchType === this.searchTypes.PARTICIPENT) {
            body = <SearchPersonComponent/>
        }
        else if(searchType === this.searchTypes.EVENT) {
            body = <SearchEventComponent/>
        }

        return (
            <div className="jdrf-p2p-fundraising-search-page ng-scope" >
                <div className="jdrf-p2p-fundraising-search-header -with-toggles hidden-xs">
                    <h2>
                        Search for
                    </h2>
                    <div className="jdrf-p2p-fundraising-search-header__toggles js--fundraising-search-type-toggles"
                         data-default-type="">
                        <button
                            style={{margin: '20px'}}
                            type="button"
                            className="btn btn-primary"
                            onClick={e => {this.changeSearchType(this.searchTypes.PARTICIPENT)}}
                        >
                            A Participtant
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ e => {this.changeSearchType(this.searchTypes.EVENT)}}
                        >
                            An Event
                        </button>

                    </div>
                </div>

                <div className="spirit-card spirit-card--no-elevation jdrf-p2p-fundraising-search-card js--fundraising-search-card">
                    <div className="spirit-card__text">
                        <div className="spirit-card__body">
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchComponent;
