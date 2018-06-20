function addFollow(req, res, next) {
  // console.log('folow test!!!!!!!!!!!!    ', req.body);
  req.app.get('db')
  .followInfo.add_follow([req.body.userid, req.body.followid])
  .then(response => res.status(200).json())
  .catch(err => console.log(err));
};
function getFollowReviews(req, res, next) {
  req.app.get('db')
  .followInfo.get_followReviews([req.params.id])
  .then(response => {
    // console.log('GET RESPONSE!!!!!!!    ', response);
    res.status(200).json(response);
  })
  .catch(err => console.log(err));
};
function getFollowList(req, res, next) {
  req.app.get('db')
  .followInfo.get_followList([req.params.id])
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err));
};
function deleteFollow(req, res, next) {
  req.app.get('db')
  .followInfo.delete_follow([req.params.id])
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err));
};
function getFollowCheck(req, res, next) {
  req.app.get('db')
  .followInfo.get_followCheck([req.body.follower, req.body.following])
  .then(response => res.status(200).json(response))
  .catch(err => console.log(err));
};

module.exports = {
  addFollow,
  getFollowReviews,
  getFollowList,
  deleteFollow,
  getFollowCheck
};