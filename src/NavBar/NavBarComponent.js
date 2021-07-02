import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import axios from 'axios';
import {Button, Col, Container, Form, FormControl, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import './NavBarComponent.css'
import logo from './logo.png'

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{color: "white"}}>

            <Navbar style={{backgroundColor: "#3b5cad"}} expand="lg">
                <Navbar.Brand className={"bta-font"} style={{color: "white", padding: "20px", display: 'flex'}}>
                    <img src={logo}/>
                    <div>
                        British <br/>Tinnitus <br/>Association
                    </div>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link className={"bta-font"} as={Link} to="/" style={{color: "white"}}> <h3>  Home</h3>  </Nav.Link>
                    <Nav.Link className={"bta-font"} as={Link} to="/search" style={{color: "white"}}> <h3>Search </h3> </Nav.Link>
                </Nav>

                <Nav style={{marginLeft: 'auto', marginRight: '30px'}}>
                    <Nav.Link className={"bta-font"} as={Link} to="/register" style={{color: "white"}}> <h3> Register </h3> </Nav.Link>
                </Nav>


            </Navbar>
            </div>
        );
    }
}

export default NavBarComponent;
