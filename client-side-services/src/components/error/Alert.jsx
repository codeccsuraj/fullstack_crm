import React, { useEffect, useState } from "react";

const Alert = ({ message, type = "success", duration = 5000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show || !message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}

      <button
        type="button"
        className="btn-close"
        onClick={() => setShow(false)}
      ></button>
    </div>
  );
};

export default Alert;