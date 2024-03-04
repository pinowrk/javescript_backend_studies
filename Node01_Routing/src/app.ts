import express, { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();
const PORT: number = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use((request: Request, response: Response, next: NextFunction) => {
  response.locals.currentPath = request.path;
  next();
});

app.use('/register', require('./routes/register.js'));
app.use('/login', require('./routes/login.js'));
app.use('/', require('./routes/index.js'));

app.listen(PORT, () => {
  console.log(`Application listening at : ${PORT}`);
});
