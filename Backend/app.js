import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import newsRoutes from './routes/newsRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
