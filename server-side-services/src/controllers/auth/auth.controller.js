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

export const changePassword = async (req, res) => {
    try {

        const { email, oldPassword, newPassword } = req.body;
        const user = await authService.findByEmail(email);

        if (!user.success || !user.data) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        }

        // check old password
        if (user.data.password !== oldPassword) {
            return res.status(401).json({
                success: false,
                message: "Old password is incorrect"
            });
        }

        const updateResult = await authService.updateById(
            user.data._id,
            { password: newPassword }
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        console.error("Error occurred in changePassword:", error);

        return res.status(500).json({
            success: false,
            message: "Error occurred while changing password"
        });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserByEmail = await authService.findByEmail(email);

        if (!checkUserByEmail.success || !checkUserByEmail.data) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const user = checkUserByEmail.data;
        const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

        const setOtp = await authService.updateById(user._id, { otp : otp, otpExpiry: Date.now() + 5 * 60 * 1000 });

        if (!setOtp.success) {
            return res.status(400).json({
                success: false,
                message: "Failed to generate otp. try again"
            })
        }

        return res.status(200).json({
            success: true,
            message: "OTP sent to your mail. Please verify.",
            data: {
                email: user.email,
                otp: otp
            }
        })
    } catch (error) {
        console.error("Error occurred in changePassword:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while changing password"
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { otp, email, password } = req.body;

        if (!otp || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const checkUserByEmail = await authService.findByEmail(email);

        if (!checkUserByEmail.success || !checkUserByEmail.data) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const user = checkUserByEmail.data;

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

       if (user.otpExpiry && Date.now() > user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "OTP expired",
            });
        }

        const updateUser = await authService.updateById(user._id, {
            password: password,
            otp: null,
            otpExpiry: null,
        });

        if (!updateUser.success) {
            return res.status(400).json({
                success: false,
                message: "Failed to reset password",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error("Error in resetPassword:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while resetting password",
        });
    }
}