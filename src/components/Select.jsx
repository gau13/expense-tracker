import React from "react";

function Select({ id, name, value, onChange, arr, defaultVal, error }) {
  return (
    <div className="input-container">
      <label htmlFor="category">Category</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        <option value="" hidden>
          {defaultVal}
        </option>

        {arr.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}

export default Select;
