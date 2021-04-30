import React from 'react';
import ReactDOM from 'react-dom';
import './ProfileBannerComponent.css';
import bootstrap from 'bootstrap';

class ProfileBannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName: props.fullName,
      bannerPhoto: props.bannerPhoto,
      profilePhoto: props.profilePhoto
    }
  }

  componentDidUpdate(prevProps) {
    if (
        prevProps.fullName     !== this.props.fullName ||
        prevProps.bannerPhoto  !== this.props.bannerPhoto ||
        prevProps.profilePhoto !== this.props.profilePhoto
    ) {
      this.setState({
        fullName: this.props.fullName,
        bannerPhoto: this.props.bannerPhoto,
        profilePhoto: this.props.profilePhoto
      })
    }
  }

  render() {
    let {fullName, bannerPhoto, profilePhoto} = this.state
    return (
        <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--has-profile jdrf-p2p-cover-photo-wrap--tall">
          <div className="jdrf-p2p-cover-photo ng-isolate-scope">
            <div className="jdrf-p2p-cover-photo__inner"
                 style={{'background-image': 'url("' +  bannerPhoto + '")'}}>
              <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm jdrf-p2p-cover-photo__meta--has-profile">
                <div className="jdrf-p2p-cover-photo__profile">
                  <div className="jdrf-p2p-cover-photo__profile-inner"
                       style={{'background-image': 'url("' + profilePhoto + '")'}}></div>
                </div>
                <div className="jdrf-p2p-cover-photo__text">
                  <h1 className="spirit-h3">
                    <span>{fullName}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileBannerComponent;
