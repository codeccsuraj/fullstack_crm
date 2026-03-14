import jwt from 'jsonwebtoken';
import { config } from '../config/var.config.js';

export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.JwtAccessKey, {
        expiresIn: '2h',
    });
}

// Verify Access Token
export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.JwtAccessKey);
};