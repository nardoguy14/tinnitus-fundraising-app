import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

class RegistrationComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputGroup: 0,
            firstName: "",
            lastName: ""
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
                id: "dateOfBirth"
            },
            {
                title: "Home Street 1",
                id: "homeStreet1"
            },
            {
                title: "Home Street 2",
                id: "homeStreet2"
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
                id: "phoneNumber"
            },
        ]
    ]

    inputGroupsHtml = this.inputGroups.map(group =>{
        return group.map(inputItem => {

            var html = null
            if(inputItem.id === 'country'){
                html = (
                    <select className="form-select" aria-label="Default select example">
                        <option value="usa">United States</option>
                    </select>
                )
            }
            else {
                html = (
                    <div className="input-group">
                        <input onChange={e => this.changeInput(e, inputItem.id)} type="text" className="form-control"
                               aria-describedby="basic-addon3" />
                    </div>
                )
            }

            return (
                <Row>
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
        var state = {}
        state[id] = e.target.value
        this.setState(state)
    }

    changeInputGroup() {
        let {inputGroup} = this.state
        this.inputGroups[inputGroup].forEach(item => {
            alert(this.state[item.id])
        })

        this.setState({inputGroup: inputGroup + 1})
    }

    render(){
        let {inputGroup} = this.state

        return (
            <Container fluid>
                <h2 style={{'text-align': 'center'}}>Sign Up</h2>
                {this.inputGroupsHtml[inputGroup]}
                <Button onClick={e => {this.changeInputGroup()}} variant="primary">Continue</Button>
            </Container>
        );
    }
}

export default RegistrationComponent;
