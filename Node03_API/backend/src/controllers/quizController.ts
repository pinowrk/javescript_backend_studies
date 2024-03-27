import { Request, Response } from 'express';
import { QuizModel } from '../models/quizModel';

export class QuizController {
  async getQuiz(request: Request, response: Response) {
    try {
      const quizModel = new QuizModel();
      const quizData = await quizModel.getQuizData(10);
      response.json(quizData);
    } catch (error) {
      response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
