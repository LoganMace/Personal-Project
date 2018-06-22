import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

import './Following.css'
import { updateCount, searchUser } from '../../ducks/userReducer';
import { getFollowUsers } from '../../ducks/followReducer';


class Following extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      isOpen: false
    }
    this.searchHandler = this.searchHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  };

  componentDidMount() {
    this.props.updateCount();
    this.props.getFollowUsers(this.props.user.id);
  };

  searchHandler(e){
    this.setState({
      input: e.target.value
    })
  };

  clickHandler() {
    this.setState({
      input: '',
      isOpen: false
    })
  }

  submitHandler(e){
    // console.log(e.target.value);
    if(e.key === 'Enter' || e.target.value !== this.state.input){
      if(this.state.input !== ''){
        this.props.searchUser(this.state.input);  
        this.setState({
          isOpen: true
        });
      }
      else {
        this.setState({
          isOpen: false
        })
      }
    }
  };

  render() {
    // console.log(this.props);

    const followList = this.props.following.map((user) => {
      return (
        <div className='link-wrap' key={user.id}>
          <Link to={`/profile/${user.id}`}>
            <div className='following-card'>
              <img className='following-avatar' src={user.avatar} alt={`${user.username} avatar`}/>
              <h1 className='following-username'>{user.username}</h1>
              <h2 className='following-count'>{`Reviews (${user.review_count})`}</h2>
            </div>
          </Link>
        </div>
      )
    });

    const searchResults = this.props.searchResults.map((user) => {
      return (
        <div className='link-wrap' key={user.id}>
          <Link to={`/profile/${user.id}`}>
            <div className='user-results-card' onClick={() => this.clickHandler()}>
              <img className='following-avatar' src={user.avatar} alt={`${user.username} avatar`}/>
              <h1 className='following-username'>{user.username}</h1>
              <h2 className='following-count'>{`Reviews (${user.review_count})`}</h2>
            </div>
          </Link>
        </div>
      )
    });

    return (
      <div>
        {/* {!this.props.isAuthed ? (
          <h1 className='login-message'>Log in to view following!</h1>
        ) : ( */}
        <div className='following-page'>
          <div className='search-user-bar'>
            <input onKeyPress={(e)=>{this.submitHandler(e)}} className='search-input' placeholder='Find Users' type="text" value={this.state.input} onChange={(e)=>{this.searchHandler(e)}}/>
            <button onClick={(e)=>{this.submitHandler(e)}} className='search-button'><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          {(this.state.isOpen) ? <div className='user-results-box'>
            {searchResults}
          </div> : null}
          
          <h1 className='follow-total'>Following ({this.props.following.length})</h1>
          <div className='follow-list'>
            {followList}
          </div>
        </div>
        {/* // )} */}
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    ...state.user,
    ...state.follow
  };
};

export default connect(mapStateToProps, {updateCount, getFollowUsers, searchUser})(Following);