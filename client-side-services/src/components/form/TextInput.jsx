import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInput = ({
    type = 'text',
    value,
    onChange,
    name = '',
    placeholder = 'Enter your input',
    toggleEye = false,
}) => {

    const [togglePassword, setTogglePassword] = useState(false);

    const handleToggle = () => {
        setTogglePassword(prev => !prev);
    };

    const inputType =
        type === "password" && toggleEye
            ? (togglePassword ? "text" : "password")
            : type;

    return (
        <div className='position-relative'>
            <input
                placeholder={placeholder}
                className="form-control"
                type={inputType}
                value={value}
                onChange={onChange}
                name={name}
            />

            {type === "password" && toggleEye && (
                <span
                    className="toggle-eye"
                    onClick={handleToggle}
                    style={{ cursor: "pointer" }}
                >
                    {togglePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
            )}
        </div>
    );
};

export default TextInput;