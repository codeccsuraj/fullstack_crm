import Joi from 'joi'

const authDocumentValidations = Joi.object().keys({
    username: Joi.string().min(3).max(50).trim().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
        "string.max": "Username must be less than 50 characters",
    }),
    mobile: Joi.string().min(10).max(15).pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Mobile number must be 10 digits",
        "string.empty": "Mobile number is required",
        "any.required": "Mobile number is required"
    }),
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Please provide a valid email",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required"
    }),
    deviceInfo: Joi.object({
        deviceType: Joi.string().valid("DESKTOP", "MOBILE", "TABLET", "UNKNOWN").allow(null).messages({
            "string.base": "Device type must be a string",
            "any.only": "Invalid device type"
        }),
        browserType: Joi.string().trim().allow(null).messages({
            "string.base": "Browser type must be a string"
        }),
        ipAddress: Joi.string().ip({ version: ["ipv4", "ipv6"] }).allow(null).messages({
            "string.ip": "Invalid IP address"
        })
    })
})
export default authDocumentValidations;

export const changePasswordValidations = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
        "string.email": "Please provide a valid email",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    oldPassword: Joi.string().trim().required().messages({
        "string.empty": "Old password is required",
        "any.required": "Old password is required"
    }),
    newPassword: Joi.string().min(6).trim().required().messages({
        "string.empty": "New password is required",
        "string.min": "New password must be at least 6 characters",
        "any.required": "New password is required"
    }),
});