import express, { Express } from 'express';
import cors from 'cors';
import { quizRoutes } from './routes/quizRoutes';

const app: Express = express();
const port: number = 3000;

app.disable('x-powered-by');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
