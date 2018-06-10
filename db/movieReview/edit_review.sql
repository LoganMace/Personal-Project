UPDATE review
SET review = $1
WHERE id = $2
RETURNING *;