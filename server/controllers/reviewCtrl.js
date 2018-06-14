function addReview(req, res, next) {
  const db = req.app.get('db');
  // console.log('add-review log', req.body);
  const { rating, review, userid, api_id, title, poster_path, overview } = req.body;
  db
  .movieInfo.get_movie([api_id])
    .then(response => {
      // console.log('check here!!!    ', response);
      if(!response[0]) {
        db.movieReview.save_movie([title, poster_path, overview, api_id]);
      }
    })
    .then(() => db.movieInfo.get_movie([api_id]))
    .then((response) => {
      // console.log('check here!!!   ', response);
      let movie = response.map((review) => {
        return review.id
      });
      // console.log('map log------------     ', movie);
      db.movieReview.add_review([rating, review.input, userid, movie[movie.length-1], api_id]);
    })
    .then(response => res.status(200).json())
    .catch(err => console.log(err));
};

function getMovieReviews(req, res, next) {
  // console.log(req.params);
  req.app.get('db')
    .movieReview.get_movieReviews([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

function deleteReview(req, res, next) {
  req.app.get('db')
    .movieReview.delete_review([req.params.id])
    .then(response => res.status(200).json())
    .catch(err => console.log(err));
};

// function editReview(req, res, next) {
//   req.app.get('db')
//     .movieReview.edit_review([req.body.review, req.params.id])
//     .then(response => res.status(200).json(response))
//     .catch(err => console.log(err));
// };

module.exports = {
  addReview,
  getMovieReviews,
  deleteReview
};