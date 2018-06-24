import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import { getUserReviews, getTotal } from '../../ducks/userReducer';
import { addFollow, getFollowList, deleteFollow, followCheck } from '../../ducks/followReducer';
import './PublicProfile.css';

class PublicProfile extends Component {

  constructor(){
    super();
    this.state = {
      clicked: false
    }
    this.followHandler = this.followHandler.bind(this);
    this.unFollowHandler = this.unFollowHandler.bind(this);
  }

  componentDidMount() {
    this.props.followCheck(this.props.user.user.id, this.props.match.params.id);
    this.props.getFollowList(this.props.user.user.id);
    this.props.getUserReviews(this.props.match.params.id);
    this.props.getTotal(this.props.match.params.id);
  };

  followHandler(userid, followid) {
    this.props.addFollow(userid, followid).then(() => this.setState({
        clicked: !this.state.clicked
      })).then(()=>this.props.followCheck(this.props.user.user.id, this.props.match.params.id));
  };

  unFollowHandler() {
    this.props.deleteFollow(this.props.user.user.id, this.props.match.params.id).then(() => this.setState({
        clicked: !this.state.clicked
      })).then(()=>this.props.followCheck(this.props.user.user.id, this.props.match.params.id));
  };

  render() {
    // console.log(this.props);

    const reviewList = this.props.user.userReviews.map((review) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <Link to={`/movie/${review.api_id}`}><img className='profile-review-poster' src={`https://image.tmdb.org/t/p/w300/${review.poster}`} alt={`${review.title} poster`}/></Link>
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
                <p className='review-card-text'>
                  {review.review}
                </p>
              </div>
    });

    const prof = this.props.user.userReviews.slice(0, 1);
    const newProf = prof.map((profile) => {
      return  <div className='profile-card' key={profile.user_id}>
                <div className='pic-card'>
                  <img className='profile-pic' src={profile.avatar} alt="user-avatar"/>
                  <p className='pic-username'>{profile.username}</p>
                </div>
                {(!this.props.user.isAuthed) ? null : 
                (this.props.follow.followCheck) ? <button className='follow-btn' onClick={() => this.unFollowHandler()}>UnFollow</button> : <button className='follow-btn' onClick={() => this.followHandler(this.props.user.user.id, this.props.match.params.id)}>Follow</button>}
                <h1 className='review-count'>Reviews Made({this.props.user.reviewCount})</h1>
                <p className='profile-interests'><span>Movie Interests:</span></p>
                <p className='profile-interests'>{profile.interests}</p>
              </div>
    });  

    return (
          <div className='profile-page'>
              {newProf}
            <div className='profile-review-list'>
              {reviewList}
            </div>
          </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getUserReviews, addFollow, getTotal, getFollowList, deleteFollow, followCheck})(PublicProfile);