import React from 'react'

const ButtonInput = ({
    type="button",
    onClick,
    loading=false,
    label="Submit",
    className=""
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`base-btn ${className}`}
        >
            <span>{label}</span>
        </button>
    )
}

export default ButtonInput
