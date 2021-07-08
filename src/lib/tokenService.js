import React from "react";
import axios from "axios";

class TokenService {


    constructor(props) {

    }

    static getToken() {
        return window.localStorage.getItem('tinnitus_fund.access_token')
    }

    static getClaims() {
        try {
            return JSON.parse(window.atob(window.localStorage.getItem('tinnitus_fund.access_token').split(".")[1]))
        }
        catch(error) {
            return null
        }

    }

    static storeToken(token) {
        window.localStorage.setItem("tinnitus_fund.access_token", token);
    }

}
export default TokenService