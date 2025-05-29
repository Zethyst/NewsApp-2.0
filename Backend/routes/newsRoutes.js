import express from 'express';
import { fetchNews } from '../controllers/newsController.js';

const router = express.Router();

router.post('/', fetchNews);

export default router;
