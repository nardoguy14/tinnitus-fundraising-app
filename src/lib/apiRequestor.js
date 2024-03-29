import axios from "axios";
import TokenService from "./tokenService";

let host = process.env.REACT_APP_API_HOST

export function loginUser(username, password) {
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);


    return axios.post(`${host}/users/me/login`, bodyFormData, {
        headers: {
            'Grant-Type': 'password'
        }
    })
}

export function getProfilePicture(username) {
    return axios.get(`${host}/users/` + username + `/photos/profile`)
}

export function getBannerPicture(username) {
    return axios.get(`${host}/users/` + username + `/photos/banner`)
}

export function postProfilePicture(data) {
    return axios.post(`${host}/users/photos/profile/base64`, data, {
        headers: {
            "accept": `application/json`,
            // "Accept-Language": `en-US,en;q=0.8`,
            // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            "Authorization": `Bearer ` + TokenService.getToken()
        }
    })
}

export function postBannerPicture(data) {
    return axios.post(`${host}/users/photos/banner/base64`, data, {
        headers: {
            accept: `application/json`,
            // "Accept-Language": `en-US,en;q=0.8`,
            // "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            "Authorization": `Bearer ` + TokenService.getToken()
        }
    })
}

export function postPaymentIntent(username, amount) {
    return axios.post(`${host}/payment_intent`, {
        username: username,
        fundraiser_id: 1,
        amount: amount,
        currency: "usd"
    })
}

export function postDonation(username, firstName, lastName, message, amount, fundraiserId) {
    return axios.post(`${host}/donations`,{
        username: username,
        fundraiser_id: fundraiserId,
        donor_first_name: firstName,
        donor_last_name: lastName,
        donor_comment: message,
        amount: amount,
        currency: `usd`
    })
}

export function getUser(searchParams) {
    return axios.get(`${host}/users?` + searchParams.join("&"))
}

export function editUser(body) {
    var config = {
        headers: {
            "Authorization": `Bearer ` +  TokenService.getToken()
        }
    }
    return axios.put(`${host}/users`, body, config)
}

export function editFundraiser(fundraiser_id, body) {
    return axios.put(`${host}/fundraisers/${fundraiser_id}`, body)
}

export function getUserByUsername(username) {
    return axios.get(`${host}/users?username=`+username)
}

export function getFundraisers(id) {
    return axios.get(`${host}/users/`+id+`/fundraisers`)
}

export function getFundraiser(id) {
    return axios.get(`${host}/fundraisers?id=` + id)
}

export function searchFundraisers(searchParams) {
    return axios.get(`${host}/fundraisers?` + searchParams.join("&"))
}


export function getFundraisersDonations(id) {
    return axios.get(`${host}/donations/fundraiser/` + id)
}

export function postLinkUserToFundraiser(body) {
    return axios.post(`${host}/users/fundraisers`, body)
}

export function postFundraiser(body) {
    return axios.post(`${host}/fundraisers`, body)
}

export function getActivities(eventId) {
    return axios.get(`${host}/activities?fundraiser_id=${eventId}`)
}

export function createUser(body) {
    return axios.post(`${host}/users`, body)
}
