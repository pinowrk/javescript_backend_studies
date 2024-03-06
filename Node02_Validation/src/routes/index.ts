import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response) => {
  const username = request.query.username;
  response.render('./index.ejs', { username: username });
});

module.exports = router;
