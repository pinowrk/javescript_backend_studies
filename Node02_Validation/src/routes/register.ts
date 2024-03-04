import express, { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const router: Router = express.Router();

router.get('/', (request: Request, response: Response) => {
  response.render('./register.ejs');
});

router.post(
  '/',
  [
    check('username', 'ユーザ名が入力されていません').notEmpty(),
    check('email', 'メールアドレスが入力されていません').notEmpty(),
    check('password', 'パスワードが入力されていません').notEmpty(),
    check('confirm_password', '確認用パスワードが入力されていません').notEmpty(),
    check('password', 'パスワードは7文字以上である必要があります').isLength({ min: 7 }),
    check('password', 'パスワードと確認用パスワードが一致しません').custom(
      (value, { req }) => value === req.body.confirm_password
    ),
  ],
  (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.render('./register.ejs', { errors: errors.array() });
    } else {
      response.redirect('/');
    }
  }
);
module.exports = router;
