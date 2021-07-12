import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, getDefaultKeyBinding} from 'draft-js';
import bootstrap from 'bootstrap';
import './ProfileComponent.css';
import axios from 'axios';
import 'draft-js/dist/Draft.css';
import {RichEditorComponent} from '../../RichEditorComponent/RichEditorComponent'
import {Link} from "react-router-dom";
import * as apiRequestor from '../../lib/apiRequestor'


class ProfileAboutComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
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
        let {name, infoHTML, usersProfile, username} = this.state


        return (
            <div>
                <div className="jdrf-p2p-personal__story">
                    <div className="spirit-long-form-text">
                        <div className="jdrf-p2p-personal__story-headline">
                            <h2 className="spirit-h3">Welcome to My Personal Page for B4 Bombers </h2>
                        </div>
                        <div className="jdrf-p2p-personal__video"></div>
                        {aboutMeSection}
                        <RichEditorComponent updateDescription={apiRequestor.editUser} usersProfile= {usersProfile} savedEditorState={infoHTML}/>
                    </div>
                </div>

                <div className="jdrf-p2p-personal__secondary-cta hidden-spirit-xs hidden-spirit-sm">
                    <div className="jdrf-p2p-personal__cta-col ng-scope">
                        <Link
                            style={{backgroundColor: 'rgb(59, 92, 173)'}}
                            className="spirit-button"
                            to={"donation?username=" + username}> Donate
                            <span className="ng-scope">&nbsp;to&nbsp;
                                <span className="ng-binding">{name}</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileAboutComponent;
