import React from 'react';
import ReactDOM from 'react-dom';
import './ProfileBannerComponent.css';
import bootstrap from 'bootstrap';
import {Button} from "react-bootstrap";
import FormData from 'form-data'
import defaultBanner from './default-banner.jpeg'
import defaultProfilePhoto from './profileDefault.jpg'
import {getBannerPicture, getProfilePicture, postBannerPicture, postProfilePicture} from "../../lib/apiRequestor";

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
    getProfilePicture(this.state.username)
    .then(result => {
      console.log(result.data)
      if(result.data !== "") {
        this.setState({
          profilePhoto:
              'url("' + 'data:image/png;base64,' + result.data.file + '")'
        })
      }
    })

    getBannerPicture(this.state.username)
      .then(result => {
        console.log(typeof result.data)
        if(result.data !== ""){
          this.setState({
            bannerPhoto: 'url("' +  'data:image/png;base64,' + result.data.file + '")'
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
    let comp = this
    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result.split(',')[1])

        let x = {
            base64photo: reader.result.split(',')[1]
        }

        postProfilePicture(x)
        .then(result => {
          comp.setState({profilePhoto: 'url("' + 'data:image/png;base64,' + reader.result.split(',')[1] + '")'})
        })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    getBase64(file)
  }

  handleBannerInputChange(event) {
    let data = new FormData();
    let bannerUrl = URL.createObjectURL(event.target.files[0])
    let file = event.target.files[0]
    data.append('file', file, file.name);


    let comp = this
    function getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result.split(',')[1])

        let x = {
          base64photo: reader.result.split(',')[1]
        }

        postBannerPicture(x)
            .then(result => {
              comp.setState({bannerPhoto: 'url("' + 'data:image/png;base64,' + reader.result.split(',')[1] + '")'})
            })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    getBase64(file)


  }

  insertProfileButton() {
    return (
        <div>
          <input
              onChange={e => {this.handleProfileInputChange(e)}}
              style={{color: 'rgba(0, 0, 0, 0)', opacity:0 }}
              type='file'
              ref={input => this.inputElement = input} />
          <span id='val'></span>
          <Button
              type={'file'}
              variant="light"
              onClick={e => {this.editProfilePhoto()}}>Edit</Button>
        </div>
    )
  }

  insertCoverButton() {
    return (
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
    )
  }

  render() {
    let {fullName, bannerPhoto, profilePhoto} = this.state
    return (
        <div className="jdrf-p2p-cover-photo-wrap jdrf-p2p-cover-photo-wrap--has-profile jdrf-p2p-cover-photo-wrap--tall"
          style={{marginTop: '24px',
            marginBottom: '24px'
          }}
        >
          <div className="jdrf-p2p-cover-photo">
            <div className="jdrf-p2p-cover-photo__inner"
                 style={{'background-image': bannerPhoto}}>
              <div className="jdrf-p2p-cover-photo__meta hidden-spirit-xs hidden-spirit-sm jdrf-p2p-cover-photo__meta--has-profile"
                style={{marginTop: 0, height: '100%'}}
              >
                <div className="jdrf-p2p-cover-photo__profile">
                  <div className="jdrf-p2p-cover-photo__profile-inner"
                       style={{'background-image': profilePhoto}}>
                    <div className="jdrf-p2p-profile-photo__edit">
                      {this.insertProfileButton()}
                    </div>

                  </div>
                </div>

                <div className="jdrf-p2p-cover-photo__text">
                  <h1 className="name-item">
                    <span>{fullName}</span>
                  </h1>
                </div>

                {this.insertCoverButton()}

              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default ProfileBannerComponent;
