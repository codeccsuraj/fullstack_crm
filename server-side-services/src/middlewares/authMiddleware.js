import { authService } from "../services/auth/auth.service.js";
import { verifyAccessToken } from "../utility/jwt.utils.js";

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            })
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }
        let decoded;
        try {
            decoded = verifyAccessToken(token);
        } catch (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token',
            });
        }

        // Check if email exists in payload
        if (!decoded?.email) {
            return res.status(400).json({
                success: false,
                message: 'Token payload missing email',
            });
        }

        const user = await authService.findByEmail(decoded.email);

        if (!user.success) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
}