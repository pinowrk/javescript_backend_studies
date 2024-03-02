import * as express from 'express';
import type { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response) => {
  response.render('./login.ejs');
});

module.exports = router;
