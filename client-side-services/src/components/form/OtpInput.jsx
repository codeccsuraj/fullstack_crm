import React, { useRef } from "react";

const OtpInput = ({
  length = 6,
  value = "",
  onChange,
  autoFocus = true,
}) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // only numbers

    if (!val) return;

    const newValue =
      value.substring(0, index) +
      val +
      value.substring(index + 1);

    onChange(newValue);

    // Move to next input
    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace handling
    if (e.key === "Backspace") {
      if (value[index]) {
        const newValue =
          value.substring(0, index) +
          "" +
          value.substring(index + 1);
        onChange(newValue);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pasteData) return;

    onChange(pasteData);

    // Focus last filled input
    const lastIndex = pasteData.length - 1;
    if (inputsRef.current[lastIndex]) {
      inputsRef.current[lastIndex].focus();
    }
  };

  return (
    <div className="d-flex gap-2 justify-content-center" onPaste={handlePaste}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          maxLength="1"
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          autoFocus={autoFocus && index === 0}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OtpInput;