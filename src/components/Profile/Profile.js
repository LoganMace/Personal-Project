import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import { faUserEdit } from '@fortawesome/fontawesome-free-solid';
import StarRatings from 'react-star-ratings';

import { getUserReviews, getTotal, getUser } from '../../ducks/userReducer';
import { deleteReview, saveEdit } from '../../ducks/reviewReducer';
import './Profile.css';

const DEFAULT_HEIGHT = 36;

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      edit: false,
      reviewText: '',
      editId: null,
      height: DEFAULT_HEIGHT
    }
    this.deleteHandler = this.deleteHandler.bind(this);
    this.submitEditHandler = this.submitEditHandler.bind(this);
    this.editClickHandler = this.editClickHandler.bind(this);
    this.changeReviewHander = this.changeReviewHander.bind(this);
    this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
  }

  componentDidMount() {
    this.props.getUser()
      .then(() => this.props.getUserReviews(this.props.user.user.id))
      .then(() => this.props.getTotal(this.props.user.user.id));
    this.mounted = true;
    if (this.state.edit) {
      this.setFilledTextareaHeight();
    }
  };

  deleteHandler(id) {
    this.props.deleteReview(id).then(response => this.props.getUserReviews(this.props.user.user.id));
  };

  submitEditHandler(id) {
    this.props.saveEdit(id, this.state.reviewText).then(() => this.props.getUserReviews(this.props.user.user.id));
    this.setState({
      edit: false,
      reviewText: ''
    })
  };

  editClickHandler(index, reviewid) {
    this.setState({
      edit: !this.state.edit,
      editId: reviewid,
      reviewText: this.props.user.userReviews[index].review
    })
  };

  changeReviewHander() {
    let newReview = this.refs.newReview.value;
    this.setState({
      reviewText: newReview
    })
  };

  
  setFilledTextareaHeight() {
    if (this.mounted) {
      const element = this.ghost;
      this.setState({
        height: element.clientHeight,
      });
    }
  }

  getExpandableField() {
    const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    const { height, reviewText } = this.state;

    return (
      <div>
        <textarea
          ref='newReview'
          className="textarea"
          name="textarea"
          id="textarea"
          autoFocus={true}
          defaultValue={reviewText}
          style={{
            height,
            resize: isOneLine ? "none" : null
          }}
          onChange={() => this.changeReviewHander()}
          onKeyUp={this.setFilledTextareaHeight}
        />
      </div>
    );
  }

  getGhostField() {
    return (
      <div
        className="textarea textarea-ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {this.state.reviewText}
      </div>
    );
  }

  render() {
    console.log(this.props);
    const {user} = this.props.user;

    const reviewList = this.props.user.userReviews.map((review, index) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <Link to={`/movie/${review.api_id}`}><img className='profile-review-poster' src={`https://image.tmdb.org/t/p/w92/${review.poster}`} alt={`${review.title} poster`}/></Link>
                {(this.state.edit && review.review_id === this.state.editId) ? 
                  <div className="container">
                    {this.getExpandableField()}
                    <button className='rv-btn' onClick={() => this.submitEditHandler(review.review_id)}>Save</button>
                    {this.getGhostField()}
                  </div> :
                  <p className='profile-review-text'> 
                    {review.review}
                  </p>
                }
                {(review.rating === null) ? null : 
                  <div className='review-stars'>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="rgb(155, 1, 1)"
                      starEmptyColor='rgb(203, 211, 227)'
                      starDimension="15px"
                      starSpacing="0px"
                    />
                  </div>}
                <div className='review-buttons'>
                  {(review.user_id !== this.props.user.user.id) ? null : <button className='rv-btn'><FontAwesomeIcon icon={faEdit} onClick={() => this.editClickHandler(index, review.review_id)}/></button>}
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
              <Link to='/editprofile'><button className='edit-profile'><FontAwesomeIcon icon={faUserEdit} /></button></Link>
              <h1 className='review-count'>Reviews Made({this.props.user.reviewCount})</h1>
              <p className='profile-interests'><span>Movie Interests:</span></p>
              <p className='profile-interests'>{user.interests}</p>
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

export default connect(mapStateToProps, {getUserReviews, saveEdit, deleteReview, getTotal, getUser})(Profile);