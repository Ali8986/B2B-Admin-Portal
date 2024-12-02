import React, { useState } from "react";

const CustomInput = ({
  label = "",
  type = "text",
  Inputvalue,
  onChange,
  autoComplete = "auto",
  required = false,
  endAdornment = null,
  startAdornment = null,
  custom_BootStraps,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`form-box-unit ${custom_BootStraps}`}>
      <div className="input-wrapper">
        {startAdornment && (
          <span className="start-adornment">{startAdornment}</span>
        )}
        <input
          type={type}
          autoComplete={autoComplete}
          className="input"
          required={required}
          value={Inputvalue}
          onChange={(e) => onChange(e)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(!!Inputvalue)}
        />
        {endAdornment && <span className="end-adornment">{endAdornment}</span>}
      </div>
      <label className={focused || Inputvalue ? "shrink" : ""}>{label}</label>
      <fieldset className={focused || Inputvalue ? "active" : ""}>
        <legend className={focused || Inputvalue ? "visible" : ""}>
          <span>{label}</span>
        </legend>
      </fieldset>
    </div>
  );
};

export default CustomInput;
