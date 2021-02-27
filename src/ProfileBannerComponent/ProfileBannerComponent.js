import React from 'react';
import ReactDOM from 'react-dom';
import './ProfileBannerComponent.css';
import bootstrap from 'bootstrap';

class ProfileBannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidUpdate(prevProps) {
    if (
        prevProps.amountRaised !== this.props.amountRaised
    ) {
      this.setState({amountRaised: this.props.amountRaised})
    }
  }

  render() {
    return (
        <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--has-profile jdrf-p2p-cover-photo-wrap--tall">
      <div className="jdrf-p2p-cover-photo ng-isolate-scope">
        <div className="jdrf-p2p-cover-photo__inner"
             style={{'background-image': 'url("' + "https://www2.jdrf.org/images/friendraiser_uploads/7791.254222820.customnull" + '")'}}>
          <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm jdrf-p2p-cover-photo__meta--has-profile">
            <div className="jdrf-p2p-cover-photo__profile">
              <div className="jdrf-p2p-cover-photo__profile-inner"
                   style={{'background-image': 'url("' + "https://www2.jdrf.org/images/friendraiser_uploads/8115.1182060652.customnull" + '")'}}></div>
            </div>
            <div className="jdrf-p2p-cover-photo__text">
              <h1 className="spirit-h3">
                <span>Kevin Brayton</span>
              </h1>
              <div className="jdrf-p2p-cover-photo__subheading">
                <span>
                  Fundraising with
                  <a href="TR?fr_id=8115&amp;pg=team&amp;team_id=306163">
                    <strong>B4 Bombers</strong>
                  </a>
                </span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
  }
}

export default ProfileBannerComponent;
