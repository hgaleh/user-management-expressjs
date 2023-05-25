const { body } = require('express-validator');
import { param } from 'express-validator';
import * as userService from '../user-service';

const commonForAddAndUpdate = [
    body('firstName').notEmpty().withMessage('firstName is required!'),
    body('lastName').notEmpty().withMessage('lastName is required!'),
    body('email').isEmail().withMessage('Invalid email!'),
    body('phone').notEmpty().withMessage('Phone required!'),
];

export const addUserValidator = [
    ...commonForAddAndUpdate,
    body('email').custom(userService.emailExists).withMessage('email should be unique!'),
    body('phone').custom(userService.phoneExists).withMessage('phone should be unique!')
];

export const updateUserValidator = [
    ...commonForAddAndUpdate,
    body('id').notEmpty().withMessage('id is required!'),
    body('id').notEmpty().custom(userService.idExists).withMessage('id not exists!'),
    body('email').custom(userService.emailIsUnique).withMessage('email should be unique!'),
    body('phone').custom(userService.phoneIsUnique).withMessage('phone should be unique!'),
];

export const deleteValidator = [
    param('id').notEmpty().custom(userService.idExists).withMessage('id not exists!')
];