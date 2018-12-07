SELECT * FROM users
WHERE users.id IN (
  SELECT relation.following FROM relation
  INNER JOIN users ON users.id = relation.follower
  WHERE relation.follower = $1
)
ORDER BY users.username ASC;
