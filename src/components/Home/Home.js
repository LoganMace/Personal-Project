import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPopular } from '../../ducks/movieReducer';
import { getUser } from '../../ducks/userReducer';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {

  componentDidMount() {
    this.props.getPopular();
    this.props.getUser();
  }

  render() {
    // console.log(this.props);
    const popular = this.props.movie.popularMovies.map((movie) => {
      return(
        <div className='popular-card' key={movie.id}>
          <Link to={`/movie/${movie.id}`}><img className='popular-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`${movie.title} poster`}/></Link>
          {/* <h3>{movie.title}</h3> */}
        </div>
      )
    });
    return (
      <div className='home-box'>
        <div className='card-box'>
          {popular} 
        </div>
        <div className='timeline'>
          posts 
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {getPopular, getUser})(Home);