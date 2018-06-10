import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSpecific } from '../../ducks/movieReducer';
import { getUser } from '../../ducks/userReducer';
import { addReview } from '../../ducks/reviewReducer';
import './ReviewForm.css';

class ReviewForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reviewForm: {
        input: ''
      }
    }
    this.inputHandler = this.inputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.getSpecific();
    this.props.getUser();
  };

  inputHandler(e) {
    this.setState({
      reviewForm: {
        input: e.target.value
      }
    });
  };

  submitHandler() {
    const { user, match } = this.props;
    const { title, poster_path, overview } = this.props.movie.selected;
    this.props.addReview(title, poster_path, overview, this.state.reviewForm, user.user.id, match.params.id);
    this.setState({
      reviewForm: {
        input: ''
      }
    });
    this.props.history.push(`/movie/${this.props.match.params.id}`);
  };

  render() {
    console.log(this.props);
    return (
      <div className='review-form'>
        {this.props.movie.selected.poster_path !== undefined ? (<img className='review-poster' src={`https://image.tmdb.org/t/p/w500/${this.props.movie.selected.poster_path}`} alt={`${this.props.movie.selected.title} poster`}/>) : null}
        <form className='review-bar'  onSubmit={() => this.submitHandler()}>
          <textarea className='review-input' value={this.state.reviewForm.input} onChange={e => this.inputHandler(e)}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getSpecific, getUser, addReview})(ReviewForm)