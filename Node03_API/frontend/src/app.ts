import express, { Express } from 'express';
import path from 'path';

const app: Express = express();
const port: number = 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.disable('x-powered-by');

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
