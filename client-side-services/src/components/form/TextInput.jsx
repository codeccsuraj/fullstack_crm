import React from 'react';
import '../../styles/form.css'
const TextInput = ({
    type = 'text',
    value,
    onChange,
    className = '',
    name = '',
    placeholder = 'Enter your input',
    label = "text",
    ...rest
}) => {
    return (
        <input
            placeholder={placeholder}
            className="form-control"
            type={type} 
            value={value}
            onChange={onChange}
            name={name}
        />
    );
};

export default TextInput;
