import express from 'express'
import * as auth from '../../controllers/auth/auth.controller.js';
import { validateSchema } from '../../middlewares/validate.schema.js';
import authDocumentValidations, { changePasswordValidations } from '../../schema/auth/auth.schema.js';
import { validateToken } from '../../middlewares/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.post('/register', validateSchema(authDocumentValidations), auth.createUser);
authRoutes.post('/login', auth.authenticateUser);
authRoutes.post('/verify-email', auth.verifyEmail);
authRoutes.post('/reset-password', auth.resetPassword);

authRoutes.get('/get-user', validateToken, auth.getUserById);
authRoutes.patch('/change-password', validateToken, validateSchema(changePasswordValidations), auth.changePassword);

export default authRoutes;