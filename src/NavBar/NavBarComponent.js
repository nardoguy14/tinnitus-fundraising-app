import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import axios from 'axios';
import {Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import './NavBarComponent.css'
import logo from './logo.png'
import TokenService from "../lib/tokenService";

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        let claims = TokenService.getClaims()
        var homeOrLogin = null
        if(claims !== null){
            homeOrLogin = (
                        <Nav.Link
                            className={"bta-font"}
                            as={Link}
                            to={`/profile?username=${claims.username}`}
                            style={{color: "white"}}>
                            <h3> Profile </h3>
                        </Nav.Link>
            )
        }

        return (
            <div style={{color: "white"}}>

            <Navbar style={{backgroundColor: "#3b5cad"}} expand="lg">
                <Navbar.Brand className={"bta-font"} style={{color: "white", padding: "20px", display: 'flex'}}>
                    <img src={logo}/>
                    <div>
                        British <br/>Tinnitus <br/>Association
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{marginRight:"20px"}}/>
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="mr-auto">
                        <Nav.Link className={"bta-font"} as={Link} to="/" style={{color: "white"}}> <h3>  Home</h3>  </Nav.Link>
                        <Nav.Link className={"bta-font"} as={Link} to="/search" style={{color: "white"}}> <h3>Search </h3> </Nav.Link>
                    </Nav>

                    <Nav style={{marginLeft: 'auto', marginRight: '30px'}}>
                        <Nav.Link className={"bta-font"} as={Link} to="/register" style={{color: "white"}}> <h3> Register </h3> </Nav.Link>
                        {homeOrLogin}
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
            </div>
        );
    }
}

export default NavBarComponent;
