import React from 'react';
import './InfoDetailsComponent.css';
import bootstrap from 'bootstrap';
import ReactDOM from 'react-dom';

class InfoDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.startDate,
      startTime: props.startTime,
      contactPerson: props.contactPerson,
      contactEmail: props.contactEmail,
      contactPhone: props.contactPhone,
    }
  }

  componentDidUpdate(prevProps) {
    if (
        prevProps.startDate !== this.props.startDate ||
        prevProps.startTime !== this.props.startTime ||
        prevProps.contactPerson !== this.props.contactPerson ||
        prevProps.contactEmail !== this.props.contactEmail ||
        prevProps.contactPhone !== this.props.contactPhone
    ) {
      this.setState({
        startDate: this.props.startDate,
        startTime: this.props.startTime,
        contactPerson: this.props.contactPerson,
        contactEmail: this.props.contactEmail,
        contactPhone: this.props.contactPhone,
        })
    }
  }

  render() {
    let {startDate, startTime, contactPerson, contactEmail, contactPhone} = this.state
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
                  <div className="spirit-list-item__title"> {contactPerson}</div>
                  <div className="spirit-list-item__links-contain">
                    <a className="spirit-list-item__link" href={"mailto:" + contactEmail} >Email</a>&nbsp;| {contactPhone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InfoDetailsComponent;
