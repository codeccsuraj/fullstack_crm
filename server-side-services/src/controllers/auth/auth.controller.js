import { authService } from "../../services/auth/auth.service.js";
import { getRequestInfo } from "../../utility/getInfo.js"

export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const requestInfo = getRequestInfo(req);

        const result = await authService.create(data);

        const logsPayload = {
            
        }
        return res.status(result?.status).json(result)
    } catch (error) {

    }
}