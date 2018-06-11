SELECT * FROM review r
INNER JOIN movie m ON m.id = r.movie_id
INNER JOIN users u ON r.user_id = u.id
INNER JOIN relation rl ON u.id = rl.following
WHERE rl.follower = $1
ORDER BY r.review_id DESC;