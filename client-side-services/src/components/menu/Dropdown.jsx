import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ label, icon, items = [] }) => {
  const [showMenu, setShowMenu] = useState(false);
  const wrapperRef = useRef(null);
  const LabelIcon = icon;

  useEffect(() => {
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleItemClick = (item) => {
    if (item?.onClick) {
      item.onClick();
    }
    setShowMenu(false);
  };

  return (
    <div className="dropdown-container position-relative" ref={wrapperRef}>
      <button
        type="button"
        className="btn border px-2 btn-sm d-flex align-items-center gap-2"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {icon && (
          <span>
            <LabelIcon />
          </span>
        )}
        {label && <span>{label}</span>}
      </button>

      {showMenu && (
        <ul className="dropdown-list">
          {items.map((item, idx) => {
            const Icon = item?.icon;

            if (item?.path) {
              return (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="dropdown-link"
                    onClick={() => handleItemClick(item)}
                  >
                    {Icon && <Icon />}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={idx}
                className="dropdown-link"
                onClick={() => handleItemClick(item)}
              >
                {Icon && <Icon />}
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;