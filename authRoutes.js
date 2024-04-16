import express from 'express';
import { body } from 'express-validator';
import { signUp, logIn } from '../controllers/authController.js';
import verifyToken from '../middlewares/tokens.js';


const router = express.Router();

router.post('/signup', [
    body('username').isString().notEmpty().isLength({ min: 4, max: 20 }),
    body('displayName').isString().notEmpty().isLength({ min: 4, max: 20 }),
    body('password').isString().notEmpty().isLength({ min: 4, max: 16 }),
], signUp);

router.post('/login', verifyToken, [
    body('username').isString().notEmpty().isLength({ min: 4, max: 20 }),
    body('password').isString().notEmpty().isLength({ min: 4, max: 16 }),
], logIn);

export default router;