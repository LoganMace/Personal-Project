import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser, editInterests, editUsername } from '../../ducks/userReducer';
import './EditProfile.css';

class EditProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      interests: ''
    }
    this.inputUsernameHandler = this.inputUsernameHandler.bind(this);
    this.inputInterestsHandler = this.inputInterestsHandler.bind(this);
    this.submitUsernameHandler = this.submitUsernameHandler.bind(this);
    this.submitInterestsHandler = this.submitInterestsHandler.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    // console.log('getUser fired');
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

  render() {
    // console.log(this.props);
    return (
      <div className='editprof-card'>
        <img className='avatar' src={this.props.user.user.avatar} alt="user-avatar"/>
        <h3>UserName: {this.props.user.user.username}</h3>
        <div className='username-bar'>
          <input type="text" onChange={(e)=>{this.inputUsernameHandler(e)}}/>
          <button onClick={() => {this.submitUsernameHandler()}}>Submit</button>
        </div>
        <h4>Movie Interests:</h4>
        <div className='interests-bar'>
          <input type="text" onChange={(e)=>{this.inputInterestsHandler(e)}}/>
          <button onClick={() => {this.submitInterestsHandler()}}>Submit</button>
        </div>
        <div className='interests'>{this.props.user.user.interests}</div>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, editInterests, editUsername})(EditProfile);