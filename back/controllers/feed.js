import { getFeedService } from "../services/feed.js";

export const getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const posts = await getFeedService(userId, limit, offset);

    res.json({
      page,
      limit,
      total: posts.length,
      posts
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error en el feed" });
  }
};
