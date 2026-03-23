import { userService } from "../../services/users/user.service.js";

export const createUser = async (req, res) => {
    try {
        const data = req.body;

        const result = await userService.createOrUpdate(data);
        return res.status(result.status).json(result);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while adding details"
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.query;

        const result = await userService.findByAuthId(id);

        return res.status(result.status).json(result);
    } catch (error) {
        console.error("Error occurred in authenticateUser:", error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while authenticating details"
        });
    }
}