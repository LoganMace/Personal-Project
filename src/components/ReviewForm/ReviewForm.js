import React, { Component } from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings'

import { getSpecific } from '../../ducks/movieReducer';
import { addReview } from '../../ducks/reviewReducer';
import './ReviewForm.css';

class ReviewForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewForm: {
        input: '',
        rating: 0
      }
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  componentDidMount() {
    this.props.getSpecific();
  };

  changeRating( newRating, name ) {
    this.setState({
      reviewForm: {
        input: this.state.reviewForm.input,
        rating: newRating
      } 
    });
  };

  inputHandler(e) {
    this.setState({
      reviewForm: {
        input: e.target.value,
        rating: this.state.reviewForm.rating
      }
    });
  };

  submitHandler() {
    const { user, match } = this.props;
    const { title, poster_path, overview } = this.props.movie.selected;
    this.props.addReview(title, poster_path, overview, this.state.reviewForm.rating, this.state.reviewForm, user.user.id, match.params.id);
    this.props.history.push(`/movie/${this.props.match.params.id}`);
  };

  render() {
    // console.log(this.state);
    return (
      <div className='review-form'>
        {this.props.movie.selected.poster_path !== undefined ? (<img className='review-poster' src={`https://image.tmdb.org/t/p/w500/${this.props.movie.selected.poster_path}`} alt={`${this.props.movie.selected.title} poster`}/>) : null}
        <div className='star-rating'>
          <StarRatings
            rating={this.state.reviewForm.rating}
            starRatedColor="rgb(155, 1, 1)"
            starHoverColor="rgb(155, 1, 1)"
            changeRating={this.changeRating}
            numberOfStars={5}
            name='rating'
            starDimension="30px"
            starSpacing="5px"
          />
        </div>
        <form className='review-bar'  onSubmit={() => this.submitHandler()}>
          <textarea className='review-input' value={this.state.reviewForm.input} onChange={e => this.inputHandler(e)}/>
          <button className='sub-btn'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getSpecific, addReview})(ReviewForm)