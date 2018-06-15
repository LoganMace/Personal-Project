import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

import { getUserReviews } from '../../ducks/userReducer';
import { addFollow } from '../../ducks/followReducer';

class PublicProfile extends Component {

  componentDidMount() {
    this.props.getUserReviews(this.props.match.params.id);
  };

  followHandler(userid, followid) {
    this.props.addFollow(userid, followid);
  };

  render() {
    console.log(this.props);

    const reviewList = this.props.user.userReviews.map((review) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <Link to={`/movie/${review.api_id}`}><img className='profile-review-poster' src={`https://image.tmdb.org/t/p/w92/${review.poster}`} alt={`${review.title} poster`}/></Link>
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
                <button onClick={() => this.followHandler(this.props.user.user.id, this.props.match.params.id)}>Follow</button>
                <p className='profile-interests'>Movie Interests: <br/><br/>{profile.interests}</p>
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

export default connect(mapStateToProps, {getUserReviews, addFollow})(PublicProfile);