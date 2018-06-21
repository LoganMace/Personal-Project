function editInterests(req, res, next) {
  // console.log(req.body.interests, req.params.id);
  req.app.get('db')
    .editProfile.edit_interests([req.body.interests, req.params.id])
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

function editUsername(req, res, next) {
  // console.log(req.body.username, req.params.id);
  req.app.get('db')
    .editProfile.edit_username([req.body.username, req.params.id])
    .then(response => {
      // console.log(response);
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
};

function editAvatar(req, res, next) {
  // console.log('CHECK HERE!!!!     ', req.body);
  req.app.get('db')
    .editProfile.edit_avatar([req.body.avatar, req.params.id])
    .then(response => {res.status(200).json(response)})
    .catch(err => console.log(err));
};

function getUserReviews(req, res, next) {
  // console.log(req.params);
  req.app.get('db')
    .userInfo.get_userReviews([req.params.id])
    .then(response => {
      // console.log(response);
      res.status(200).json(response)})
    .catch(err => console.log(err));
};

function getUserById(req, res, next) {
  req.app.get('db')
    .userInfo.getUserById([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

function getTotal(req, res, next) {
  req.app.get('db')
    .userInfo.get_total([req.params.id])
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

function updateReviewCount(req, res, next) {
  req.app.get('db')
    .userInfo.update_reviewCount()
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

function searchUser(req, res, next) {
  // console.log(req.params);
  req.app.get('db')
    .userInfo.search_user(req.params.name)
    .then(response => res.status(200).json(response))
    .catch(err => console.log(err));
};

module.exports = {
  editInterests,
  editUsername,
  editAvatar,
  getUserReviews,
  getUserById,
  getTotal,
  updateReviewCount,
  searchUser
}