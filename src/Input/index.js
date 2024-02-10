import React, { useState, useRef } from "react";
import "./Input.scss";

export default function Input({
  onChange,
  className,
  name,
  value,
  width,
  label,
  password,
  email,
  required,
  newRef,
  style,
}) {
  const [focus, setFocus] = useState(value.length >= 1 ? true : false);

  const onBlurFunc = (e) => {
    if (value.length >= 1) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };
  const onFocusFunc = (e) => {
    // if (document.activeElement === newRef.current) {
    //   // do something
    //   console.log("Element is focused");
    // }
    setFocus(true);
  };

  return (
    <div className="input full-width relative" style={style}>
      {required ? (
        <>
          <input
            type={`${password ? "password" : "text"}${
              email ? "email" : "text"
            }`}
            ref={newRef}
            name={name}
            className={`form__input full-width full-height absolute ${className}`}
            placeholde=""
            onChange={onChange}
            value={value}
            onFocus={(e) => onFocusFunc(e)}
            onBlur={(e) => onBlurFunc(e)}
            autoComplete="true"
            required
          />
        </>
      ) : (
        <>
          <input
            type={`${password ? "password" : "text"}${
              email ? "email" : "text"
            }`}
            ref={newRef}
            name={name}
            className={`form__input full-width full-height absolute ${className}`}
            placeholde=""
            onChange={onChange}
            value={value}
            onFocus={(e) => onFocusFunc(e)}
            onBlur={(e) => onBlurFunc(e)}
            autoComplete="true"
          />
        </>
      )}
      <label
        htmlFor=""
        className={`form__label absolute ${focus ? "active" : ""}`}
      >
        {label}
      </label>
    </div>
  );
}
