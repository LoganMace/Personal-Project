UPDATE review
SET review = $1
WHERE review_id = $2
RETURNING *;