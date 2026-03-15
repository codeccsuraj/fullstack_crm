import { AuthModel } from "../../models/auth/auth.model.js";
import { generateAccessToken } from "../../utility/jwt.utils.js";

class AuthServices {
    async create(data) {
        try {

            const checkByEmail = await this.findByEmail(data.email);
            const checkByMobile = await this.findByMobile(data.mobile);
            const checkByUsername = await this.findByUsername(data.username);

            if (checkByEmail?.success) {
                return {
                    status: 301,
                    success: false,
                    message: "User already exist with this email"
                }
            }

            if (checkByMobile?.success) {
                return {
                    status: 301,
                    success: false,
                    message: "User already exist with this mobile"
                }
            }

            if (checkByUsername?.success) {
                return {
                    status: 301,
                    success: false,
                    message: "User already exist with this username"
                }
            }

            const result = await AuthModel.create(data);

            const tokenPayload = {
                id: result._id,
                email: result.email,
                role: result.role
            };

            const token = generateAccessToken(tokenPayload);

            return {
                status: 201,
                success: true,
                message: "User registered successfully",
                data: result,
                token
            };

        } catch (error) {

            // HANDLE DUPLICATE KEY ERROR
            if (error.code === 11000) {

                const field = Object.keys(error.keyPattern)[0];

                return {
                    status: 301,
                    success: false,
                    message: `User already exists with this ${field}`
                };
            }

            console.error("Error occurred in AuthServices - create", error);

            return {
                status: 500,
                success: false,
                message: "Error occurred while adding user"
            };
        }
    }

    async findById(id) {
        try {
            if (!id || id.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Provide a valid id"
                }
            }

            const result = await AuthModel.findById(id);

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No data found"
                }
            }

            return {
                status: 200,
                success: true,
                message: "Data found",
                data: result
            }

        } catch (error) {
            console.error("Error occurred in AuthServices - findById", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async findByEmail(email) {
        try {
            if (!email || email.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Provide a valid email"
                }
            }

            const result = await AuthModel.findOne({ email });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No data found"
                }
            }

            return {
                status: 200,
                success: true,
                message: "Data found",
                data: result
            }

        } catch (error) {
            console.error("Error occurred in AuthServices - findByEmail", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async findByMobile(mobile) {
        try {
            if (!mobile || mobile.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Provide a valid mobile"
                }
            }

            const result = await AuthModel.findOne({ mobile });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No data found"
                }
            }

            return {
                status: 200,
                success: true,
                message: "Data found",
                data: result
            }

        } catch (error) {
            console.error("Error occurred in AuthServices - findByMobile", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async findByUsername(username) {
        try {
            if (!username || username.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Provide a valid username"
                }
            }

            const result = await AuthModel.findOne({ username });

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "No data found"
                }
            }

            return {
                status: 200,
                success: true,
                message: "Data found",
                data: result
            }

        } catch (error) {
            console.error("Error occurred in AuthServices - findByUsername", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async updateById (id) {
        
    }
}

export const authService = new AuthServices();