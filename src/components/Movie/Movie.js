import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';

import { getSpecific, getDbMovie } from '../../ducks/movieReducer';
import { getMovieReviews, deleteReview, editReview } from '../../ducks/reviewReducer';
import './Movie.css';

class Movie extends Component {

  constructor() {
    super();
    this.deleteHandler = this.deleteHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
  };

  componentDidMount() {
    this.props.getSpecific(this.props.match.params.id);
    this.props.getDbMovie(this.props.match.params.id);
    this.props.getMovieReviews(this.props.match.params.id);
  };

  componentDidUpdate(prevProps) {
    if(this.props.match.params.id !== prevProps.match.params.id){
      this.props.getSpecific(this.props.match.params.id);
    }
  };

  deleteHandler(id) {
    this.props.deleteReview(id).then(response => this.props.getMovieReviews(this.props.match.params.id));
  };

  editHandler(id) {
    this.props.editReview(id);
  };


  render() {
    console.log(this.props);
    const reviewList = this.props.review.reviews.map((review) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <div className='user-tag'>
                  <Link to={`/profile/${review.user_id}`}><img className='user-review-pic' src={review.avatar} alt="user-avatar"/></Link>
                  <p>{review.username}</p>
                </div>
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
      <div className='movie-page'>
      <div className='movie-card'>
        <img className='selected-poster' src={`https://image.tmdb.org/t/p/w500/${this.props.movie.selected.poster_path}`} alt={`${this.props.movie.selected.title} poster`}/>
        <h3 className='selected-title'>{this.props.movie.selected.title}</h3>
        <p className='selected-summary'>{this.props.movie.selected.overview}</p>
      </div>
        <Link to={`/movie/${this.props.movie.selected.id}/reviewform`}><button>Add Review</button></Link>
        <div className='movie-reviews-list'>
          {reviewList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getSpecific, getMovieReviews, getDbMovie, deleteReview, editReview})(Movie)