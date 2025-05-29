import axios from 'axios';

export const fetchNews = async (req, res) => {
  try {
    const { query, category = 'general', page = 1, pageSize = 10 } = req.body;

    const searchQuery = category.toLowerCase() === 'general' 
      ? query || 'India' 
      : category.toLowerCase();

    const params = {
      apiKey: process.env.NEWS_API_KEY,
      q: searchQuery,
      page,
      pageSize,
      language: 'en',
      sortBy: 'relevancy' //popularity or publishedAt
    };

    const response = await axios.get('https://newsapi.org/v2/everything', { params });
    console.log("Number of articles fetched: ",response.data.articles.length);
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch news data' });
  }
};

