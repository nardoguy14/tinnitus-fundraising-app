import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import moment from "moment";
import * as Swal from "sweetalert2";
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import {CreateEventRichEditorComponent} from "./CreateEventRichEditorComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEventComponent.css";
import * as apiRequestor from '../lib/apiRequestor'
import TokenService from '../lib/tokenService'
import tokenService from "../lib/tokenService";


class CreateEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputGroup: 0,
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            editor_details: "",
            contact: {},
            date_start: new Date(),
            date_end: new Date()
        }
    }

    componentWillMount() {
        let inputHtml = this.inputGroups.map(group =>{
            let component = this
            return group.map(inputItem => {
                this.itemNumber +=1
                var html = null
                if(inputItem.id === 'date_start' || inputItem.id === 'date_end'){
                    html = (
                        <DatePicker
                            style={{zIndex: 9999}}
                            selected = {component.state[inputItem.id]}
                            onChange={(date) => this.changeDate(inputItem.id, date)}
                        />
                    )
                }
                else if(inputItem.id === 'editor_details') {
                    html = (
                        <CreateEventRichEditorComponent setDescription={this.setDescription}/>
                    )
                }
                else {
                    html = (
                        <div className="input-group">
                            <input
                                placeholder={inputItem.placeholder}
                                onChange={e => this.changeInput(e, inputItem.id)}
                                type={"text"}
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


        this.setState({inputHtml: inputHtml});
    }

    inputGroups = [
        [
            {
                title: "Event Name",
                id: "name"
            },
            {
                title: "Street Address",
                id: "address"
            },
            {
                title: "City",
                id: "city"
            },
            {
                title: "State",
                id: "state"
            },
            {
                title: "Zip Code",
                id: "zip"
            }

        ]
    ]


     setDescription = (body) => {
        this.setState({editor_details: body.description})
    }

    itemNumber = 0

    changeInput(e, id) {
        var state = {}
        state[id] = e.target.value
        this.setState(state)
    }

    changeDate(id, dateValue) {
        console.log(dateValue)
        var x = {}
        x[id] = dateValue
        this.setState(x)
    }

    validateInputs(inputGroup) {
        if(inputGroup !==1){
            for(var i = 0; i < this.inputGroups[inputGroup].length; i++){
                let inputItem = this.inputGroups[inputGroup][i]
                if(this.state[inputItem.id] === "") {
                    Swal.fire({
                        icon: 'error',
                        title: 'We\'re missing a value',
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
            var {
                name, editor_details, address, city, state, zip,
                date_start, date_end
            } = this.state

            let claims = TokenService.getClaims()
            apiRequestor.getUser([`username=${claims['username']}`])
                .then(resp => {
                    console.log(resp.data[0])
                    let body = {
                        name: name,
                        description: editor_details,
                        address: address,
                        city: city,
                        state: state,
                        zip: zip,
                        contact: {
                            name: `${resp.data[0].firstName} ${resp.data[0].lastName}`,
                            phone_number: resp.data[0].phoneNumber,
                            email: resp.data[0].email
                        },
                        date_start: moment(date_start).format('YYYY-MM-DD HH:mm:ss'),
                        date_end: moment(date_end).format('YYYY-MM-DD HH:mm:ss')
                    }
                    console.log(body)
                    apiRequestor.postFundraiser(body).then(resp => {
                        this.props.history.push('/event?id='+resp.data.id)
                    })
                })

        }
        else {
            this.setState({inputGroup: inputGroup + 1})
        }
    }

    render(){
        if(TokenService.getToken() === null){
            Swal.fire({
                icon: 'error',
                title: 'Registered User Required',
                text: 'Sorry! Please register first before creating an event!'
            }).then(() => {
                this.props.history.push('/')
            })
        }
        let {inputGroup, inputHtml} = this.state
        var finished = false
        if(inputGroup === 1){
            finished = true
        }

        var html = null
        if(inputGroup === 1){
            html = (
                <div>
                    <Row key={this.itemNumber}>
                        <Col>
                            <label htmlFor="basic-url">Date Start</label>
                            <DatePicker
                                style={{zIndex: 9999, width: '100%'}}
                                selected = {this.state['date_start']}
                                onChange={(date) => this.changeDate('date_start', date)}
                            />
                            <br/>
                        </Col>
                        <Col>
                            <label htmlFor="basic-url">Date End</label>
                            <DatePicker
                                style={{zIndex: 9999, width: '100%'}}
                                selected = {this.state['date_end']}
                                onChange={(date) => this.changeDate('date_end', date)}
                            />
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label htmlFor="basic-url">Description</label>
                            <CreateEventRichEditorComponent setDescription={this.setDescription}/>
                            <br/>
                        </Col>
                    </Row>
                </div>
            )
        }
        else{
            html = inputHtml[inputGroup]
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
                            <h1 className={"bta-font"} style={{'text-align': 'center'}}>Create Event</h1>
                            {html}
                            <Button onClick={e => {this.changeInputGroup(finished)}} variant="primary">{finished ? 'Finish' : 'Continue' }</Button>
                        </Container>


                    </Col>
                </Row>
            </Container>
        );
    }
}

export default CreateEventComponent = withRouter(CreateEventComponent);
