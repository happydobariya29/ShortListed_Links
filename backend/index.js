const express = require("express");
const axios = require("axios");
const cors = require("cors"); 

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

// Define your routes
app.get("/repositories", async (req, res) => {
  try {
    const { param1, param2 } = req.query;
    const response = await axios.get(
      `http://api.github.com/search/repositories?q=created:2023-01-10&sort=stars&order=desc&per_page=${param1}&page=${param2}`
    );
    const repositories = response.data.items;
    res.json(repositories);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
