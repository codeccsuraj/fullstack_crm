import express from 'express';
import * as user from '../../controllers/users/user.controller.js';

const userRoutes = express.Router();

userRoutes.post('/create', user.createUser);

userRoutes.get('/get-user', user.getUserById);

export default userRoutes;