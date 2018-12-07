const axios = require('axios');

const {apiKey} = require('../../src/key');

function getPopular(req, res , next) {
  axios
    .get(`https://api.themoviedb.org/3/movie/now_playing?${apiKey}&language=en-US&page=1&region=US`)
    .then(response => res.status(200).json(response.data.results))
    .catch(err => console.log(err));
};

function getSpecific(req, res, next) {
  // console.log('request-logan', req.params);
  axios
    .get(`https://api.themoviedb.org/3/movie/${req.params.id}?${apiKey}&language=en-US`)
    .then(response => res.status(200).json(response.data))
    .catch(err => console.log(err));
};

function getDbMovie(req, res, next) {
  // console.log(req.params);
  req.app
    .get('db')
    .movieInfo.get_movie(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(arr => console.log(err));
};

function getAverage(req, res, next) {
  req.app.get('db')
    .movieReview.get_average(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(arr => console.log(err));
};


module.exports = {
  getPopular,
  getSpecific,
  getDbMovie,
  getAverage
};