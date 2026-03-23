import UserModel from "../../models/users/user.model.js";
import { generateAccessToken } from "../../utility/jwt.utils.js";

class UserServices {
    async createOrUpdate(data) {
        try {
            if (!data?.authId) {
                return {
                    status: 400,
                    success: false,
                    message: "authId is required"
                };
            }

            const result = await UserModel.findOneAndUpdate(
                { authId: data.authId },
                { $set: data },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                }
            );

            return {
                status: 200,
                success: true,
                message: "User data created/updated successfully",
                data: result,
            };

        } catch (error) {
            console.error("Error in UserServices - createOrUpdate", error);

            return {
                status: 500,
                success: false,
                message: "Error occurred while saving user"
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

            const result = await UserModel
                .findById(id)
                .populate({
                    path: 'authId',
                    select: "-password -__v"
                });

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
            console.error("Error occurred in UserServices - findById", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async findByAuthId(id) {
        try {
            if (!id || id.trim() === "") {
                return {
                    status: 400,
                    success: false,
                    message: "Provide a valid id"
                }
            }

            const result = await UserModel.findOne({ authId: id }).populate({
                path: 'authId',
                select: "-password -__v"
            });;

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
            console.error("Error occurred in UserServices - findById", error)
            return {
                status: 500,
                success: false,
                message: "Something went wrong while fetching details"
            }
        }
    }

    async updateById(id, data) {
        try {

            const result = await UserModel.findByIdAndUpdate(
                id,
                data,
                { returnDocument: 'after', runValidators: true }
            );

            if (!result) {
                return {
                    status: 404,
                    success: false,
                    message: "Document not found"
                };
            }

            return {
                status: 200,
                success: true,
                message: "Updated data successfully",
                data: result
            };

        } catch (error) {

            console.error("Error occurred in UserServices - updateById", error);

            return {
                status: 500,
                success: false,
                message: "Something went wrong while updating data"
            };
        }
    }
}

export const userService = new UserServices();