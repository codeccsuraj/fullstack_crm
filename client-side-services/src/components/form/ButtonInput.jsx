import React from 'react'
import { ImSpinner8 } from "react-icons/im";

const ButtonInput = ({
    type = "button",
    onClick,
    loading = false,
    label = "Submit",
    className = ""
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className={`btn ${className}`}
        >
            <span>
                {loading ? (
                    <span>
                        <ImSpinner8
                            className='spin'
                            color='#fff'
                            size={20}
                        />
                        </span>
                ) : (
                    label
                )}
            </span>
        </button>
    )
}

export default ButtonInput
