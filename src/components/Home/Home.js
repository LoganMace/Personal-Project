import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPopular } from '../../ducks/movieReducer';
import { getUser } from '../../ducks/userReducer';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import StarRatings from 'react-star-ratings';
import movieQuotes from 'movie-quotes';

import { getFollowReviews } from '../../ducks/followReducer';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

class Home extends Component {

  componentDidMount() {
    this.props.getPopular();
    this.props.getUser().then(response => this.props.getFollowReviews(this.props.user.user.id));
  }

  render() {
    // console.log(this.props);

    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "30px",
      slidesToShow: 1,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnFocus: true,
      pauseOnHover: true,
      swipeToSlide: true,
      draggable: true
    };

    const popular = this.props.movie.popularMovies.map((movie) => {
      return(
        <div className='popular-card' key={movie.id}>
          <Link to={`/movie/${movie.id}`}><img className='popular-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`}/></Link>
        </div>
      )
    });
    const followReviews = this.props.follow.followReviews.map((review) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <div className='user-tag'>
                  <div className='review-pic-box'>
                    <Link to={`/profile/${review.user_id}`}><img className='user-review-pic' src={review.avatar} alt="user-avatar"/></Link>
                  </div>
                  <p>{review.username}</p>
                </div>
                <p className='follow-card-text'>
                  {review.review}
                </p>
                <div className='poster-stars'>
                  {(review.rating === null) ? null : 
                    <div className='rv-stars'>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="rgb(155, 1, 1)"
                        starEmptyColor='rgb(203, 211, 227)'
                        starDimension="15px"
                        starSpacing="0px"
                      />
                    </div>}
                  <Link to={`/movie/${review.api_id}`}><img className='follow-review-poster' src={`https://image.tmdb.org/t/p/w300/${review.poster}`} alt={`${review.title} poster`}/></Link>
                </div>
              </div>
    });

    return (
      <div className='home-box'>
        <div className='card-box'>
        <h1 className='now-playing'>Now Playing</h1>
          <div className='slider'>
          </div>
          <Slider {...settings}>
            {popular} 
          </Slider>
        </div>
        {(this.props.follow.followReviews[0]) ? 
          <div className='timeline'>
            <div className='home-reviews-list'>
              {followReviews}
            </div>
          </div> : 
          <div className='home-filler'>
            {movieQuotes.random()}
            <h1 className='home-message'>Follow some friends, and go watch some movies!</h1>
          </div>} 
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getPopular, getUser, getFollowReviews})(Home);