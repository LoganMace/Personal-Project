import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Search.css';
import { apiKey } from '../../key';

class Search extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      results: [],
      isOpen: false
    }

    this.searchHandler = this.searchHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    // this.selectHandler = this.selectHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      input: '',
      isOpen: false
    })
  }

  searchHandler(e){
    this.setState({
      input: e.target.value
    })
  };

  submitHandler(){
    if(this.state.input !== ''){
      axios
        .get(`https://api.themoviedb.org/3/search/movie?${apiKey}&language=en-US&query=${this.state.input}&page=1&include_adult=false`)
        .then(response => {
          // console.log(response.data.results);
          this.setState({
            results: response.data.results,
            isOpen: true
          })
        });
    }
    else {
      this.setState({
        results: []
      })
    }
  };


  render(){
    // console.log(this.state.input);
    // console.log(this.state.results);
    const searchResults = this.state.results.map((movie) => {
      return (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}><h3 onClick={() => this.clickHandler()}>{movie.title}</h3></Link>
        </div>
      )
    });

    return (
      <div>
        <div className='search-bar'>
          <form onSubmit={()=>{this.submitHandler()}}>
            <input className='search-input' type="text" value={this.state.input} onChange={(e)=>{this.searchHandler(e)}}/>
            <button>Search</button>
          </form>
        </div>
        {(this.state.isOpen) ? ((this.state.results.length > 0) ? <div ref='box' className='results-box'>{searchResults}</div> : null) : null}
        
      </div>
    )
  }
}

export default Search;