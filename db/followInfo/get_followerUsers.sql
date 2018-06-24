SELECT * FROM users
WHERE users.id IN (
  SELECT relation.follower FROM relation
  INNER JOIN users ON users.id = relation.following
  WHERE relation.following = $1
  -- ORDER BY users.username ASC
);
