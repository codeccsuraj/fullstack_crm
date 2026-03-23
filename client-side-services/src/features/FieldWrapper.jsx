import React from "react";

const FieldWrapper = ({
    formik,
    label,
    name,
    required = false,
    children, // 👈 pass input component
    ...props
}) => {
    return (
        <div className="">

            {/* Label */}
            {label && (
                <label htmlFor={name} className="small fw-semibold">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}

            {/* Dynamic Input Component */}
            {children}

            {/* Error */}
            {formik.touched[name] && formik.errors[name] && (
                <small className="text-danger">
                    {formik.errors[name]}
                </small>
            )}
        </div>
    );
};

export default FieldWrapper;