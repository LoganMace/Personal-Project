SELECT ROUND(AVG(rating), 2), COUNT(rating) from review
WHERE api_id = $1;