import axios from "axios";
import TokenService from "./tokenService";

export function getProfilePicture(username) {
    return axios.get('http://localhost:8000/users/' + username + '/photos/profile')
}

export function getBannerPicture(username) {
    return axios.get('http://localhost:8000/users/' + username + '/photos/banner')
}

export function postProfilePicture(data) {
    return axios.post("http://localhost:8000/users/photos/profile", data, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': 'Bearer ' + TokenService.getToken()
        }
    })
}

export function postBannerPicture(data) {
    return axios.post("http://localhost:8000/users/photos/banner", data, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'Authorization': 'Bearer ' + TokenService.getToken()
        }
    })
}

export function postPaymentIntent(username, amount) {
    return axios.post('http://localhost:8000/payment_intent', {
        username: username,
        fundraiser_id: 1,
        amount: amount,
        currency: "usd"
    })
}

export function postDonation(username, firstName, lastName, message, amount) {
    return axios.post('http://localhost:8000/donations',{
        username: username,
        fundraiser_id: '7',
        donor_first_name: firstName,
        donor_last_name: lastName,
        donor_comment: message,
        amount: amount,
        currency: 'usd'
    })
}

export function getUser(searchParams) {
    return axios.get(`http://localhost:8000/users?` + searchParams.join("&"))
}

export function editUser(body) {
    var config = {
        headers: {
            'Authorization': 'Bearer ' +  TokenService.getToken()
        }
    }
    return axios.put('http://localhost:8000/users', body, config)
}

export function getUserByUsername(username) {
    return axios.get(`http://localhost:8000/users?username=`+username)
}

export function getFundraisers(id) {
    return axios.get('http://localhost:8000/users/'+id+'/fundraisers')
}

export function getFundraiser(id) {
    return axios.get('http://localhost:8000/fundraisers?id=' + id)
}

export function searchFundraisers(searchParams) {
    return axios.get(`http://localhost:8000/fundraisers?` + searchParams.join("&"))
}


export function getFundraisersDonations(id) {
    return axios.get('http://localhost:8000/donations/fundraiser/' + id)
}

export function postLinkUserToFundraiser(body) {
    return axios.post('http://localhost:8000/users/fundraisers', body)
}

export function getActivities(eventId) {
    return axios.get("http://localhost:8000/activities?fundraiser_id="+eventId)
}

export function createUser(body) {
    return axios.post('http://localhost:8000/users', body)
}
