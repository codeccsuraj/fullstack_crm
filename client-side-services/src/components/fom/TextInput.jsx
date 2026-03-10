import React from 'react';
import '../../styles/form.css'
const TextInput = ({
    type = 'text',
    value,
    onChange,
    className = '',
    name = '',
    placeholder = 'Enter your input',
    label="text",
    ...rest
}) => {
    return (
        <div class="input-container">
            <input
                placeholder={placeholder}
                className="input-field"
                type={type} value={value}
                onChange={onChange}
                name={name}
            />
            <label htmlFor={name} class="input-label">{label || ""}</label>
            <span class="input-highlight"></span>
        </div>
    );
};

export default TextInput;
