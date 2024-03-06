import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response) => {
  response.render('./login.ejs');
});

router.post('/', (request: Request, response: Response) => {
  const username = request.body.username;
  response.render('./index.ejs', { username: username });
});

module.exports = router;
