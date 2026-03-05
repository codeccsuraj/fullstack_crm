import Joi from 'joi'

const authDocumentValidations = Joi.object().keys({
    username: Joi.string().min(3).max(50).trim().required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
        "string.max": "Username must be less than 50 characters",
        "any.required": "Username is required"
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
    })
})

export default authDocumentValidations;