import React from 'react';
import ReactDOM from 'react-dom';
import './InfoDetailsComponent.css';
import bootstrap from 'bootstrap';

class InfoDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "November 1, 2020",
      startTime: "6 AM PST",
      site: "https://jdrfonewalk.virtualeventsite.com/southernca",
      contactPerson: "Sue Pietrzak",
      contactEmail: "abc@me.com",
      contactPhone: "(760) 791-3504",
      teamName: "Southern California Chapter"
    }
  }

  render() {
    let {startDate, startTime, site, contactPerson, contactEmail, contactPhone, teamName} = this.state
    return (
        <div>
          <div className="jdrf-p2p-page-details">
            <div className="spirit-list">
              <div className="spirit-list-item spirit-list-item--avatar">
                <div className="spirit-list-item__avatar">
                  <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
                </div>
                <div className="spirit-list-item__content">
                  <div className="spirit-list-item__title">
                    <span className="ng-binding">{startDate}</span>
                  </div>
                  <div className="spirit-list-item__meta">
                    <div> Starts: {startTime}</div>
                  </div>
                </div>
              </div>

              <div className="spirit-list-item spirit-list-item--avatar">
                <div className="spirit-list-item__avatar">
                  <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
                </div>
                <div className="spirit-list-item__content">
                  <div className="spirit-list-item__title">
                    {site}
                  </div>
                </div>
              </div>

              <div className="spirit-list-item spirit-list-item--avatar">
                <div className="spirit-list-item__avatar">
                  <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
                </div>
                <div className="spirit-list-item__content">
                  <div className="spirit-list-item__title"> {contactPerson}</div>
                  <div className="spirit-list-item__links-contain">
                    <a className="spirit-list-item__link" href={"mailto:" + contactEmail} >Email</a>&nbsp;| {contactPhone}
                  </div>
                </div>
              </div>

              <div className="spirit-list-item spirit-list-item--avatar">
                <div className="spirit-list-item__avatar">
                  <svg className="spirit-icon spirit-list-item__icon" aria-hidden="true"></svg>
                </div>
                <div className="spirit-list-item__content">
                  <div className="spirit-list-item__title">{teamName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InfoDetailsComponent;
