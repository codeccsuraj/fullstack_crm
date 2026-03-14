import { authService } from "../../services/auth/auth.service.js";
import { getRequestInfo } from "../../utility/getInfo.js"

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