import express from 'express';
import { QuizController } from '../controllers/quizController';

const router = express.Router();
const quizController = new QuizController();

router.get('/', quizController.getQuiz);

export { router as quizRoutes };
