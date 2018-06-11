require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');

const port = process.env.PORT || 3001;
const app = express();

const { getPopular, getSpecific, searchMovie, getDbMovie } = require('./controllers/movieCtrl');
const { strat, getUser, logout } = require('./controllers/authCtrl');
const { editInterests, editUsername, getUserReviews, getUserById } = require('./controllers/userCtrl');
const { addReview, getMovieReviews, deleteReview } = require('./controllers/reviewCtrl');
const { addFollow, getFollowReviews } = require('./controllers/followCtrl');

massive(process.env.CONNECTION_STRING)
  .then(db => app.set('db', db))
  .catch(err => console.log(err));

app.use(cors());
app.use(json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1223334444
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

passport.serializeUser((user, done) => {
  const db = app.get('db');
  db
    .userInfo.getUserByAuthid([user.id])
    .then(response => {
      if (!response[0]) {
        db
          .userInfo.addUserByAuthid([user.nickname, user.id, user.picture])
          .then(res => done(null, res[0]))
          .catch((err) => console.log(err));
      } else return done(null, response[0]);
    })
    .catch((err) => console.log(err));
});

passport.deserializeUser((user, done) => done(null, user));

app.get('/api/popular', getPopular);

app.get('/api/movie/:id', getSpecific);
app.get('/api/data/:id', getDbMovie);

app.put('/api/editinterests/:id', editInterests);
app.put('/api/editusername/:id', editUsername);
app.get('/api/user/reviews/:id', getUserReviews);
app.get('/api/profile/:id', getUserById);

app.post('/api/review', addReview);
app.get('/api/movie/reviews/:id', getMovieReviews);
app.delete('/api/movie/reviews/:id', deleteReview);

app.post('/api/follow', addFollow);
app.get('/api/follow/reviews/:id', getFollowReviews);

app.get('/login',
  passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/',
    failureRedirect: 'http://localhost:3001/login'
  })
);

app.get('/api/me', getUser);
app.get('/logout', logout);

app.listen(port, ()=>console.log(`Listening on port: ${port}`));