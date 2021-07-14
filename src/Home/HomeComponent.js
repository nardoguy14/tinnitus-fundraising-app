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

class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    createInfoBlock(imageUrl, title, text) {
        return (
            <Link to={'/createEvent'} style={{textDecoration: 'none', color: 'black'}}>
                <Container style={{backgroundColor: 'transparent', padding:'30px',  height:'300px'}}  className={"rounded shadow-lg"} fluid>
                    <img
                        className={'rounded'}
                        style={{width:'200px', height: '150px', display: 'block',
                            margin: 'auto', marginBottom: '10px'}}
                        src={imageUrl}
                    ></img>
                    <h5 style={{textAlign: 'center'}}>{title}</h5>
                    <p style={{width: '200px', textAlign: 'center', textDecoration: 'none'}}>{text}</p>
                </Container>
            </Link>
        )
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
                            <div className="d-flex flex-wrap justify-content-around flex-row">
                                <div className="p-2">
                                    {this.createInfoBlock("https://marvel-b1-cdn.bc0a.com/f00000000243109/1x5o5mujiug388ttap1p8s17-wpengine.netdna-ssl.com/wp-content/uploads/2020/06/FY20-JDRF.org-Fundraising_TEAM-800x450.png",
                                        "Fundraise Your Way",
                                    "Create your own kind of fundraiser on your time.")}

                                </div>
                                <div className="p-2">
                                    {this.createInfoBlock("https://marvel-b1-cdn.bc0a.com/f00000000243109/1x5o5mujiug388ttap1p8s17-wpengine.netdna-ssl.com/wp-content/uploads/2020/06/golf.png",
                                        "Find a group",
                                        "Join a support group to meet your needs.")}
                                </div>
                                <div className="p-2">{
                                    this.createInfoBlock("https://www.tinnitus.org.uk/handlers/getimage.ashx?idmf=5a1d0e6d-07ec-4f2c-a5ad-5b79914e950b&w=300&h=300&f=1",
                                        "Sound Therapy",
                                        "Find what works for you.")
                                }</div>
                            </div>
            </Container>
        );
    }
}

export default HomeComponent = withRouter(HomeComponent);
