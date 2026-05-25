import { getRecommendationsForUser } from '../services/recommendation.service.js';

export async function recommendations(req, res, next) {
  try {
    const items = await getRecommendationsForUser(req.user, Number(req.query.limit || 12));
    res.json({ items });
  } catch (error) {
    next(error);
  }
}
