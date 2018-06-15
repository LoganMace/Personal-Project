import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

import { getUser, editInterests, editUsername, editAvatar } from '../../ducks/userReducer';
import './EditProfile.css';

class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      interests: '',
      avatar: '',
      isUploading: false,
      progress: 0,
      avatarURL: ''
    }
    this.inputUsernameHandler = this.inputUsernameHandler.bind(this);
    this.inputInterestsHandler = this.inputInterestsHandler.bind(this);
    this.submitUsernameHandler = this.submitUsernameHandler.bind(this);
    this.submitInterestsHandler = this.submitInterestsHandler.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
  };

  inputUsernameHandler(e) {
    this.setState({
      username: e.target.value
    })
  };

  inputInterestsHandler(e) {
    this.setState({
      interests: e.target.value
    })
  };


  submitUsernameHandler() {
    this.props.editUsername(this.props.user.user.id, this.state.username);
    this.setState({
      username: ''
    });
  };

  submitInterestsHandler() {
    this.props.editInterests(this.props.user.user.id, this.state.interests);
    this.setState({
      interests: ''
    });
  };

  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
    this.setState({isUploading: false});
    console.error(error);
  }
  handleUploadSuccess = (filename) => {
    this.setState({avatar: filename, progress: 100, isUploading: false});
    firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url})).then(() => this.props.editAvatar(this.props.user.user.id, this.state.avatarURL));
  };


  render() {
    // console.log(this.props);
    return (
      <div>
        {!this.props.user.isAuthed ? (
          <h1 className='login-message'>Log in to view profile!</h1>
        ) : (
          <div className='editprof-card'>
          <img className='avatar' src={this.props.user.user.avatar} alt="user-avatar"/>
          <div className='upload'>
            <form className='upload-form'>
              {this.state.isUploading &&
                <p>Progress: {this.state.progress}</p>
              }
              <label>
              Select your avatar
                <FileUploader
                  hidden
                  accept="image/*"
                  name="avatar"
                  randomizeFilename
                  storageRef={firebase.storage().ref('images')}
                  onUploadStart={this.handleUploadStart}
                  onUploadError={this.handleUploadError}
                  onUploadSuccess={this.handleUploadSuccess}
                  onProgress={this.handleProgress}
                />
              </label>
            </form>
          </div>
          <h3><span>UserName:</span> {this.props.user.user.username}</h3>
          <div className='username-bar'>
            <input type="text" onChange={(e)=>{this.inputUsernameHandler(e)}}/>
            <button className='sub-btn' onClick={() => {this.submitUsernameHandler()}}>Submit</button>
          </div>
          <h3><span>Movie Interests:</span></h3>
          <div className='interests-bar'>
            <textarea className='interests-form' type="text" onChange={(e)=>{this.inputInterestsHandler(e)}}/>
            <button className='sub-btn' onClick={() => {this.submitInterestsHandler()}}>Submit</button>
          </div>
          <div className='interests'>{this.props.user.user.interests}</div>
        </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, editInterests, editUsername, editAvatar})(EditProfile);