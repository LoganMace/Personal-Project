import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faUserEdit } from '@fortawesome/fontawesome-free-solid';

import { getUser, getUserReviews } from '../../ducks/userReducer';
import { deleteReview, editReview } from '../../ducks/reviewReducer';
import './Profile.css';

class Profile extends Component {

  constructor() {
    super();
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getUserReviews(this.props.user.user.id);
  }

  deleteHandler(id) {
    this.props.deleteReview(id).then(response => this.props.getUserReviews(this.props.user.user.id));
  };

  editHandler(id) {
    this.props.editReview(id);
  };

  render() {
    console.log(this.props);
    const {user} = this.props.user;

    const reviewList = this.props.user.userReviews.map((review) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <img className='profile-review-poster' src={`https://image.tmdb.org/t/p/w92/${review.poster}`} alt={`${review.title} poster`}/>
                <p className='review-card-text'>
                  {review.review}
                </p>
                <div className='review-buttons'>
                  {(review.user_id !== this.props.user.user.id) ? null : <button className='rv-btn'><FontAwesomeIcon icon={faEdit} /></button>}
                  {(review.user_id !== this.props.user.user.id) ? null : <button className='rv-btn' onClick={() => this.deleteHandler(review.review_id)}><FontAwesomeIcon icon={faTrashAlt} /></button>}
                </div>
              </div>
    });

    return (
      <div>
        {!this.props.user.isAuthed ? (
          <h1 className='login-message'>Log in to view profile!</h1>
        ) : (
          <div className='profile-page'>
            <div className='profile-card'>
              <div className='pic-card'>
                <img className='profile-pic' src={user.avatar} alt="user-avatar"/>
                <p className='pic-username'>{user.username}</p>
              </div>
              <p className='profile-interests'>Movie Interests: <Link to='/editprofile'><button className='edit-profile'><FontAwesomeIcon icon={faUserEdit} /></button></Link><br/><br/>{user.interests}</p>
            </div>
            <div className='profile-review-list'>
              {reviewList}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUser, getUserReviews, editReview, deleteReview})(Profile);