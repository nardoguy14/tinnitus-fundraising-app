import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import moment from "moment";
import * as Swal from "sweetalert2";
import * as apiRequestor from '../lib/apiRequestor'
import {loginUser} from "../lib/apiRequestor";
import tokenService from "../lib/tokenService";

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputGroup: 0,
            usernameOrEmail: "",
            password: ""
        }
    }

    componentDidMount() {
    }

    changeInput(e, id) {
        var state = {}
        state[id] = e.target.value
        this.setState(state)
    }

    loginUser() {
        let {usernameOrEmail, password} = this.state
        apiRequestor.loginUser(usernameOrEmail, password).then(resp => {
            alert(JSON.stringify(resp.data))

            tokenService.storeToken(resp.data['access_token'])
            this.props.login()
            this.props.history.push('/profile?username='+tokenService.getClaims()['username'])
        })
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
                            <h1 className={"bta-font"} style={{'text-align': 'center'}}>Login</h1>
                            <Row>
                                <Col>
                                    <label htmlFor="basic-url">Email</label>
                                    <div className="input-group">
                                        <input
                                            onChange={e => this.changeInput(e, 'usernameOrEmail')}
                                            type={'input'}
                                            className="form-control"
                                            aria-describedby="basic-addon3" />
                                    </div>
                                    <br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="basic-url">Password</label>
                                    <div className="input-group">
                                        <input
                                            onChange={e => this.changeInput(e, 'password')}
                                            type={'password'}
                                            className="form-control"
                                            aria-describedby="basic-addon3" />
                                    </div>
                                    <br/>
                                </Col>
                            </Row>
                            <Button onClick={e => {this.loginUser()}} variant="primary">Submit</Button>
                        </Container>


                    </Col>
                </Row>
            </Container>
        );
    }
}

export default LoginComponent = withRouter(LoginComponent);
