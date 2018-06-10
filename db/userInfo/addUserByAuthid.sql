INSERT INTO users (username, authid, avatar)
VALUES ($1, $2, $3) RETURNING *;