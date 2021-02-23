import React from 'react';
import ReactDOM from 'react-dom';
import './InfoComponent.css';
import bootstrap from 'bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class InfoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: props.info
    };
  }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.info) !== JSON.stringify(this.props.info)) {
            this.setState({info: this.props.info})
        }
    }

  render() {
    let {info} = this.state

    let tabs = info.map(tab =>{
      return (
          <Tab>
            <span>{tab.tabTitle}</span>
          </Tab>
      )
    })
    let content = info.map(tab => {
      return (
          <TabPanel >
            {tab.content}
          </TabPanel>
      )
    })

    return (
        <div className="jdrf-p2p-greeting__content-tabs js--event-page-tabs" aria-hidden="false">
          <Tabs className="jdrf-p2p-tabs ">
            <TabList style={{transform: "translate(0px, 0px)"}}>
              {tabs}
            </TabList>
            {content}
          </Tabs>
        </div>
    );
  }
}

export default InfoComponent;
