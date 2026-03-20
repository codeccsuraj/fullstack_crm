import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen = false,
  onClose,
  children,
  width = "600px",
  showCloseBtn = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="custom-modal-container"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ width }}
            className="bg-white shadow-lg rounded p-4 position-relative"
          >
            {/* Close Button */}
            {showCloseBtn && (
              <button
                onClick={onClose}
                className="btn-close btn-sm ring-0 outline-0 border-0 position-absolute top-0 end-0 m-2"
              ></button>
            )}

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;