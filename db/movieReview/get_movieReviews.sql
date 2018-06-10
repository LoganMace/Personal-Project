SELECT * FROM review
INNER JOIN users ON review.user_id = users.id
WHERE api_id = $1
ORDER BY review_id DESC;