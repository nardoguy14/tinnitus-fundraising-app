import React from 'react';
import ReactDOM from 'react-dom';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import { FormText, Form } from 'react-bootstrap';
import TokenService from '../../lib/tokenService'
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";

class ProfileAboutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            infoHTML: props.infoHTML,
            infoHTMLTemp: props.infoHTMLTemp,
            editMode: false
        }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if (prevProps.name !== this.props.name ||
            prevProps.infoHTML !== this.props.infoHTML) {
            this.setState({infoHTML: this.props.infoHTML, name: this.props.name})
        }
    }

    updateDescription() {
        let token = TokenService.getToken()
        let {infoHTMLTemp} = this.state
        var body = {
            description: infoHTMLTemp
        }
        var config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.put('http://localhost:8000/users', body, config)
        .then(result => {
            this.setState({infoHTML: infoHTMLTemp, editMode: false})
        })
    }

    setAboutMe(aboutMe) {
        this.setState({infoHTMLTemp: aboutMe})
    }

    setEditMode() {
        this.setState({editMode: true})
    }

    render(){
        var aboutMeSection = null
        let {infoHTML, infoHTMLTemp, name, editMode} = this.state
        if(infoHTML === null || infoHTML === "" || editMode) {
            aboutMeSection = (
                <div>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Add an about me section:</Form.Label>
                        <Form.Control
                            onChange={e => { this.setAboutMe(e.target.value)}}
                            as="textarea" rows={3} value ={infoHTMLTemp}/>
                    </Form.Group>
                    <br/>
                    <button
                        type="button"
                        onClick={ e => {this.updateDescription()}}
                        className="spirit-button spirit-button--secondary spirit-button--with-icon">Save</button>
                </div>
            )
        }
        else {
            aboutMeSection = (
                <div>
                    <div
                        dangerouslySetInnerHTML={{__html: infoHTML}}
                        className="jdrf-p2p-personal__story-content">
                    </div>
                    <button
                        type="button"
                        onClick={ e => {this.setEditMode()}}
                        className="spirit-button spirit-button--secondary spirit-button--with-icon">Edit</button>
                </div>
            )
        }

        return (
            <div>
                <div className="jdrf-p2p-personal__story">
                    <div className="spirit-long-form-text">
                        <div className="jdrf-p2p-personal__story-headline">
                            <h2 className="spirit-h3">Welcome to My Personal Page for B4 Bombers </h2>
                        </div>
                        <div className="jdrf-p2p-personal__video"></div>
                        {aboutMeSection}
                    </div>
                </div>

                <div className="jdrf-p2p-personal__secondary-cta hidden-spirit-xs hidden-spirit-sm">
                    <div className="jdrf-p2p-personal__cta-col ng-scope">
                        <a className="spirit-button" href="Donation2?df_id=20794&amp;FR_ID=8115&amp;PROXY_TYPE=20&amp;PROXY_ID=1441477"> Donate
                            <span className="ng-scope">&nbsp;to&nbsp;
                                <span className="ng-binding">{name}</span>
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        );
    }
}

export default ProfileAboutComponent;
