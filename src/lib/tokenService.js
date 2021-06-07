import React from "react";
import axios from "axios";

class TokenService {


    constructor(props) {

    }

    static getToken() {
        alert(window.localStorage.getItem('tinnitus_fund.access_token'))
        return window.localStorage.getItem('tinnitus_fund.access_token')
    }

    static getClaims() {
        return window.atob(window.localStorage.getItem('tinnitus_fund.access_token').split(".")[1])
    }

    static storeToken(token) {
        window.localStorage.setItem("tinnitus_fund.access_token", token);
    }

}
export default TokenService