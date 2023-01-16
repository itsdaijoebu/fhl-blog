module.exports = {
  pagination: (model) => {
    return async (req, res, next) => {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (startIndex > 0) {
        results.previous = {
          page: Number(page) - 1,
          limit: limit,
        };
      }

      results.page = Number(page);

      if (endIndex < (await model.countDocuments().exec())) {
        results.next = {
          page: Number(page) + 1,
          limit: limit,
        };
      }
      try {
        results.results = await model
          .find()
          .sort({ date: -1 })
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;
        next();
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
  },
};
