const File = require('../models/File'); 

exports.searchImages = async (req, res) => {
  try {
    const userId = req.user._id;
    const query = req.query.name;
    console.log('search image ',userId);

    if (!query) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const results = await File.find({
      user: userId,
      name: { $regex: query, $options: "i" }, // case-insensitive search
    });
    console.log('search results', results);
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Search failed", error: error.message });
  }
};
