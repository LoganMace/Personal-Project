const Auth0Strategy = require('passport-auth0');

const { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const strat = new Auth0Strategy (
  {
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    domain: DOMAIN,
    scope: 'openid profile',
    callbackURL: '/login'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
  }
);

const getUser = (req, res, next) => {
  // console.log('thtj',req.user);
  req.app
    .get('db')
    .userInfo.getUserByAuthid(req.user.authid)
    .then(response => {
      // console.log('response',response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

// const getUser = (req, res) => {
//   if (req.user) res.status(200).json(req.user);
//   else res.status(403).json({ message: 'Not Logged In' });
// };

const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('http://localhost:3000/#/');
    // res.redirect('/#/');
  });
};

module.exports = {
  strat,
  getUser,
  logout
};