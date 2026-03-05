export const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const { error, value } = schema.validate(req.body, {
                abortEarly: true,
                stripUnknown: true
            });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.details[0].message
                });
            }

            req.body = value;
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Validation middleware error"
            });
        }
    }
}