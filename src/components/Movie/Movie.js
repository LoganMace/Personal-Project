import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-regular';
import StarRatings from 'react-star-ratings';

import { getSpecific, getDbMovie, getAverage } from '../../ducks/movieReducer';
import { getMovieReviews, deleteReview, saveEdit } from '../../ducks/reviewReducer';
import './Movie.css';

const DEFAULT_HEIGHT = 36;

class Movie extends Component {

  constructor() {
    super();
    this.state = {
      deleted: false,
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
  };

  componentDidMount() {
    let promise1 = this.props.getSpecific(this.props.match.params.id);
    let promise2 = this.props.getDbMovie(this.props.match.params.id);
    let promise3 = this.props.getMovieReviews(this.props.match.params.id);
    let promise4 = this.props.getAverage(this.props.match.params.id);
    Promise.all([promise1, promise2, promise3, promise4]);
    this.mounted = true;
    if (this.state.edit) {
      this.setFilledTextareaHeight();
    }
  };

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    if(this.props.match.params.id !== prevProps.match.params.id){
      this.props.getSpecific(this.props.match.params.id);
    }
    // if(this.props.review.reviews !== prevProps.review.reviews){
    //   this.props.getMovieReviews(this.props.match.params.id);
    // }
    // return false;
  };

  deleteHandler(id) {
    this.props.deleteReview(id).then(response => this.props.getMovieReviews(this.props.match.params.id)).then(() => this.setState({
      deleted: !this.state.deleted
    })).then(() => this.props.getAverage(this.props.match.params.id));
  };

  submitEditHandler(id) {
    this.props.saveEdit(id, this.state.reviewText).then(() => this.props.getMovieReviews(this.props.match.params.id));
    this.setState({
      edit: false,
      reviewText: ''
    })
  };

  // editClickHandler(index) {
  //   this.props.clickEdit(index);
  // };

  editClickHandler(index, reviewid) {
    this.setState({
      edit: !this.state.edit,
      editId: reviewid,
      reviewText: this.props.review.reviews[index].review
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
    // console.log('PROPS!!!   ', this.props);
    // console.log('STATE!!!   ', this.state);
    // console.log('ghost   ', this);

    const reviewList = this.props.review.reviews.map((review, index) => {
      return  <div className='movie-reviews' key={review.review_id}>
                <div className='user-tag'>
                  <Link to={`/profile/${review.user_id}`}><img className='user-review-pic' src={review.avatar} alt="user-avatar"/></Link>
                  <p>{review.username}</p>
                </div>
                {(this.state.edit && review.review_id === this.state.editId) ? 
                  <div className="container">
                    {this.getExpandableField()}
                    <button className='rv-btn' onClick={() => this.submitEditHandler(review.review_id)}>Save</button>
                    {this.getGhostField()}
                  </div> :
                  <p className='review-card-text'> 
                    {review.review}
                  </p>
                }
                <div className='poster-stars'>
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
                </div>
                <div className='review-buttons'>
                  {(review.user_id !== this.props.user.user.id) ? null : <button className='rv-btn'><FontAwesomeIcon icon={faEdit} onClick={() => this.editClickHandler(index, review.review_id)}/></button>}
                  {(review.user_id !== this.props.user.user.id) ? null : <button className='rv-btn' onClick={() => this.deleteHandler(review.review_id)}><FontAwesomeIcon icon={faTrashAlt} /></button>}
                </div>
              </div>
                  
              
    });

    return (
      <div className='movie-page'>
        <div className='movie-card'>
          <img className='selected-poster' src={`https://image.tmdb.org/t/p/w500/${this.props.movie.selected.poster_path}`} alt={`${this.props.movie.selected.title} poster`}/>
          <h3 className='selected-title'>{this.props.movie.selected.title}</h3>
          <div className='star-rating'>
            <StarRatings
              rating={+this.props.movie.avgRating}
              starRatedColor="rgb(155, 1, 1)"
              starEmptyColor='rgb(203, 211, 227)'
              starDimension="30px"
              starSpacing="5px"
            />
          </div>
          <p>Ratings: ({+this.props.movie.totalReviews})</p>
          <p className='selected-summary'>{this.props.movie.selected.overview}</p>
          <Link to={`/movie/${this.props.movie.selected.id}/reviewform`}><button className='rv-btn'>Add Review</button></Link>
        </div>
        <div className='movie-reviews-list'>
          {reviewList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getSpecific, getMovieReviews, getDbMovie, deleteReview, saveEdit, getAverage})(Movie)