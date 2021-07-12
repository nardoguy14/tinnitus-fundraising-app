import React from 'react';
import ReactDOM from 'react-dom';
import './InfoComponent.css';
import bootstrap from 'bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {RichEditorComponent} from "../../RichEditorComponent/RichEditorComponent";
import * as apiRequestor from "../../lib/apiRequestor";
import TokenService from "../../lib/tokenService";
import {editFundraiser} from "../../lib/apiRequestor";

class InfoComponent extends React.Component {

    constructor(props) {
        super(props);
          var usersProfile = false
          // if(TokenService.getClaims() !== null && TokenService.getClaims()['username'] === true){
          //     usersProfile = true
          // }
          usersProfile = true
        this.state = {
            eventId: props.eventId,
            info: props.info,
            usersProfile: usersProfile,
            description: props.description
        };
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.description) !== JSON.stringify(this.props.description) ||
            JSON.stringify(prevProps.info) !== JSON.stringify(this.props.info)) {
            this.setState({info: this.props.info, description: this.props.description})
        }
    }

  render() {
    let {info, usersProfile, description,eventId} = this.state

    // let tabs = info.map(tab =>{
    //   return (
    //       <Tab>
    //         <span>{tab.tabTitle}</span>
    //       </Tab>
    //   )
    // })
    // let content = info.map(tab => {
    //   return (
    //       <TabPanel >
    //         {tab.content}
    //       </TabPanel>
    //   )
    // })

    return (
        <div>
        {/*<div className="jdrf-p2p-greeting__content-tabs js--event-page-tabs" aria-hidden="false">*/}
            {/*<Tabs className="jdrf-p2p-tabs ">*/}
            {/*    <TabList style={{transform: "translate(0px, 0px)"}}>*/}
            {/*      {tabs}*/}
            {/*    </TabList>*/}
            {/*    {content}*/}
            {/*</Tabs>*/}

            <RichEditorComponent updateDescription={body => apiRequestor.editFundraiser(eventId, body)} usersProfile={usersProfile} savedEditorState={description}/>
        </div>
    );
  }
}

export default InfoComponent;
