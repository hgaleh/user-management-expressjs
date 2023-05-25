const { body } = require('express-validator');
import * as userService from '../user-service';

export const addUserValidator = [
    body('firstName').notEmpty().withMessage('firstName is required!'),
    body('lastName').notEmpty().withMessage('lastName is required!'),
    body('email').isEmail().withMessage('Invalid email!'),
    body('email').custom(userService.emailExists).withMessage('email should be unique!'),
    body('phone').notEmpty().withMessage('Phone required!'),
    body('phone').custom(userService.phoneExists).withMessage('phone should be unique!')
];