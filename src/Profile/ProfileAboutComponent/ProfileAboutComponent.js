import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import { FormText, Form } from 'react-bootstrap';
import TokenService from '../../lib/tokenService'
import ProfileBannerComponent from "../ProfileBannerComponent/ProfileBannerComponent";
import 'draft-js/dist/Draft.css';
import {RichEditorComponent} from '../../RichEditorComponent/RichEditorComponent'


class ProfileAboutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usersProfile: props.usersProfile,
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




    render(){
        var aboutMeSection = null
        let {name, infoHTML, usersProfile} = this.state

        return (
            <div>
                <div className="jdrf-p2p-personal__story">
                    <div className="spirit-long-form-text">
                        <div className="jdrf-p2p-personal__story-headline">
                            <h2 className="spirit-h3">Welcome to My Personal Page for B4 Bombers </h2>
                        </div>
                        <div className="jdrf-p2p-personal__video"></div>
                        {aboutMeSection}
                        <RichEditorComponent usersProfile= {usersProfile} savedEditorState={infoHTML}/>
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
