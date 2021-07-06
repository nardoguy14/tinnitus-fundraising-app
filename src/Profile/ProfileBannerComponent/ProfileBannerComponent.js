import React from 'react';
import ReactDOM from 'react-dom';
import './ProfileBannerComponent.css';
import bootstrap from 'bootstrap';
import {Button} from "react-bootstrap";
import FormData from 'form-data'
import axios from "axios";
import TokenService from "../../lib/tokenService";
import defaultBanner from './default-banner.jpeg'
import defaultProfilePhoto from './profileDefault.jpg'

class ProfileBannerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      usersProfile: props.usersProfile,
      fullName: props.fullName,
      bannerPhoto: `url(${defaultProfilePhoto})`,
      profilePhoto: `url(${defaultBanner})`
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/users/' + this.state.username + '/photos/profile')
    .then(result => {
      console.log(result.data)
      if(result.data !== "") {
        this.setState({
          profilePhoto:
              'url("' + 'data:image/png;base64,' + result.data + '")'
        })
      }
    })

    axios.get('http://localhost:8000/users/' + this.state.username + '/photos/banner')
      .then(result => {
        console.log(typeof result.data)
        if(result.data !== ""){
          this.setState({
            bannerPhoto: 'url("' +  'data:image/png;base64,' + result.data + '")'
          })
        }
      })
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

  editProfilePhoto() {
    this.inputElement.click();
  }

  editBannerphoto() {
    this.bannerInputElement.click()
  }

  handleProfileInputChange(event) {
    let data = new FormData();
    let profileUrl = URL.createObjectURL(event.target.files[0])
    let file = event.target.files[0]
    data.append('file', file, file.name);
    axios.post("http://localhost:8000/users/photos/profile", data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        'Authorization': 'Bearer ' + TokenService.getToken()
      }
    })
    .then(result => {
      this.setState({profilePhoto: profileUrl})
    })
  }

  handleBannerInputChange(event) {
    let data = new FormData();
    let bannerUrl = URL.createObjectURL(event.target.files[0])
    let file = event.target.files[0]
    data.append('file', file, file.name);
    axios.post("http://localhost:8000/users/photos/banner", data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        'Authorization': 'Bearer ' + TokenService.getToken()
      }
    })
    .then(result => {
      this.setState({bannerPhoto: bannerUrl})
    })
  }

  render() {
    let {fullName, bannerPhoto, profilePhoto} = this.state
    return (
        <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--has-profile jdrf-p2p-cover-photo-wrap--tall">
          <div className="jdrf-p2p-cover-photo ng-isolate-scope">
            <div className="jdrf-p2p-cover-photo__inner"
                 style={{'background-image': bannerPhoto}}>
              <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm jdrf-p2p-cover-photo__meta--has-profile">
                <div className="jdrf-p2p-cover-photo__profile">
                  <div className="jdrf-p2p-cover-photo__profile-inner"
                       style={{'background-image': profilePhoto}}>

                    <div className="jdrf-p2p-profile-photo__edit">


                      <div>
                        <input
                            onChange={e => {this.handleProfileInputChange(e)}}
                            style={{color: 'rgba(0, 0, 0, 0)', opacity:0 }}
                            type='file' ref={input => this.inputElement = input} />
                        <span id='val'></span>
                        <Button
                            type={'file'}
                            variant="light"
                            onClick={e => {this.editProfilePhoto()}}>Edit</Button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="jdrf-p2p-cover-photo__text">
                  <h1 className="spirit-h3">
                    <span>{fullName}</span>
                  </h1>
                </div>

                <div className="jdrf-p2p-cover-photo__edit">
                  <input
                      onChange={e => {this.handleBannerInputChange(e)}}
                      style={{color: 'rgba(0, 0, 0, 0)', opacity:0 }}
                      type='file' ref={input => this.bannerInputElement = input} />
                  <span id='val'></span>
                  <Button
                      type={'file'}
                      variant="light"
                      onClick={e => {this.editBannerphoto()}}>Edit</Button>
                </div>

              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileBannerComponent;
