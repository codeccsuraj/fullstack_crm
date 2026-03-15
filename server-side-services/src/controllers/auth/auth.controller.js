import { authService } from "../../services/auth/auth.service.js";
import { getRequestInfo } from "../../utility/getInfo.js"
import { generateAccessToken } from "../../utility/jwt.utils.js";

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const requestInfo = getRequestInfo(req);

        // generate random username if empty or null
        let username = data.username;
        if (!username || username.trim() === "") {
            username = `user_${Math.random().toString(36).substring(2, 8)}`;
        }

        const finalPayload = {
            ...data,
            username,
            deviceInfo: {
                deviceType: requestInfo.deviceType,
                browserType: requestInfo.browser,
                ipAddress: requestInfo.ip
            }
        };

        const result = await authService.create(finalPayload);
        return res.status(result.status).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while adding details"
        });
    }
};

export const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        const checkUserByEmail = await authService.findByEmail(email);

        // check if user exists
        if (!checkUserByEmail.success || !checkUserByEmail.data) {
            return res.status(404).json({
                success: false,
                message: "User not registered. Please create one."
            });
        }

        const user = checkUserByEmail.data;

        // plain password comparison
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Password is invalid"
            });
        }

        // token payload
        const tokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        const token = generateAccessToken(tokenPayload);

        // remove password from response

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: checkUserByEmail.data,
            token
        });

    } catch (error) {
        console.error("Error occurred in authenticateUser:", error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while authenticating details"
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.query;

        const result = await authService.findById(id);

        return res.status(result.status).json(result);
    } catch (error) {
        console.error("Error occurred in authenticateUser:", error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while authenticating details"
        });
    }
}