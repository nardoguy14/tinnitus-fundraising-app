import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import moment from "moment";
import * as Swal from "sweetalert2";
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import TokenService from '../../lib/tokenService'
import {createUser} from "../../lib/apiRequestor";

class RegistrationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputGroup: 0,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            dateOfBirth: "",
            streetAddress1: "",
            streetAddress2: "",
            country: "usa",
            zipCode: "",
            phoneNumber: ""
        }
    }

    componentDidMount() {
    }

    inputGroups = [
        [
            {
                title: "First Name",
                id: "firstName"
            },
            {
                title: "Last Name",
                id: "lastName"
            },
            {
                title: "E-mail",
                id: "email"
            }
        ],
        [
            {
                title: "Username",
                id: "username"
            },
            {
                title: "Password",
                id: "password"
            }
        ],
        [
            {
                title: "Date of Birth",
                id: "dateOfBirth",
                placeholder: 'MM/DD/YYYY'
            },
            {
                title: "Home Street 1",
                id: "streetAddress1"
            },
            {
                title: "Home Street 2",
                id: "streetAddress2"
            },
            {
                title: "Country",
                id: "country"
            },
            {
                title: "Zip",
                id: "zipCode"
            },
            {
                title: "Phone Number",
                id: "phoneNumber",
                placeholder: '(123) 456-7890'
            },
        ]
    ]

    itemNumber = 0
    inputGroupsHtml = this.inputGroups.map(group =>{
        return group.map(inputItem => {
            this.itemNumber +=1
            var html = null
            if(inputItem.id === 'country'){
                html = (
                    <select
                        onChange={e => this.changeInput(e, inputItem.id)}
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue={'usa'}
                    >
                        <option value="usa">United States</option>
                        <option value="canada" >Canada</option>
                    </select>
                )
            }
            else {
                var type = "text"
                if(inputItem.id === 'password'){
                    type = 'password'
                }
                html = (
                    <div className="input-group">
                        <input
                            placeholder={inputItem.placeholder}
                            onChange={e => this.changeInput(e, inputItem.id)}
                            type={type}
                            className="form-control"
                            aria-describedby="basic-addon3" />
                    </div>
                )
            }

            return (
                <Row key={this.itemNumber}>
                    <Col>
                        <label htmlFor="basic-url">{inputItem.title}</label>
                        {html}
                        <br/>
                    </Col>
                </Row>
            )
        })
    })

    changeInput(e, id) {
        if(id === "country"){
            console.log(e)
        }
        var state = {}
        state[id] = e.target.value
        this.setState(state)
    }

    validateInputs(inputGroup) {
        for(var i = 0; i < this.inputGroups[inputGroup].length; i++){
            let inputItem = this.inputGroups[inputGroup][i]
            if(this.state[inputItem.id] === "" && inputItem !== 'streetaddress2') {
                Swal.fire({
                    icon: 'error',
                    title: 'We\'re missing a value',
                    text: 'Please fill in '+ inputItem.title
                })
                return false
            }
            if(this.inputGroups[inputGroup][i].id === "email"){
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(String(this.state[inputItem.id]).toLowerCase())){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Email',
                        text: 'Please fill in '+ inputItem.title
                    })
                    return false
                }

            }
            if(this.inputGroups[inputGroup][i].id === "dateOfBirth"){
                let x = moment(Date.parse(this.state[inputItem.id])).format('YYYY-MM-DD')
                console.log(typeof x)
                if(x === 'Invalid date'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Date Format',
                        text: 'Please fill in '+ inputItem.title
                    })
                    return false
                }
            }
            if(this.inputGroups[inputGroup][i].id === "phoneNumber"){
                let validNumber = isPossiblePhoneNumber(this.state[inputItem.id], 'US')
                if(!validNumber){
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Phone Number Format',
                        text: 'Please fill in '+ inputItem.title
                    })
                    return false
                }
            }
        }
        return true
    }

    changeInputGroup(finished) {
        let {inputGroup} = this.state

        if(!this.validateInputs(inputGroup)){
            return
        }

        if(finished){
            var body = this.state
            body['dateOfBirth'] = moment(Date.parse(body['dateOfBirth'])).format('YYYY-MM-DD')
            createUser(body).then(result => {
                console.log(result.data)
                TokenService.storeToken(result.data.access_token)
                this.props.history.push('/profile?username='+body['username'])
            })
        }
        else {
            this.setState({inputGroup: inputGroup + 1})
        }
    }

    render(){
        let {inputGroup} = this.state
        var finished = false
        if(inputGroup === 2){
            finished = true
        }
        return (
            <Container
                style={{
                    display: 'grid',
                    'min-height': '100vh',
                    'align-items': 'center'}}>
                <Row>
                    <Col>
                        <Container style={{backgroundColor: 'transparent', padding:'30px'}}  className={"rounded shadow-lg"} fluid>
                            <h1 className={"bta-font"} style={{'text-align': 'center'}}>Sign Up</h1>
                            {this.inputGroupsHtml[inputGroup]}
                            <Button onClick={e => {this.changeInputGroup(finished)}} variant="primary">{finished ? 'Finish' : 'Continue' }</Button>
                        </Container>


                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RegistrationComponent = withRouter(RegistrationComponent);
