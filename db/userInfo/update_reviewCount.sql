UPDATE users
SET review_count = (
  SELECT COUNT(review) FROM review
  WHERE users.id = review.user_id
  );