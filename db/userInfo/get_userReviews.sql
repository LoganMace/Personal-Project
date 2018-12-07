SELECT * FROM movie m
INNER JOIN review r ON m.id = r.movie_id
INNER JOIN users u ON r.user_id = u.id
WHERE u.id = $1
ORDER BY r.review_id DESC;