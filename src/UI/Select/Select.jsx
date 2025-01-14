import "./Select.css";
import { useState } from "react";

export default function Select({ selectedValue, options, placeholder, onChange }) {
  return (
    <div className='select-wrapper'>
      <svg
        className='select-arrow'
        width='17'
        height='9'
        viewBox='0 0 17 9'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M15.8456 1.59898L9.91633 7.22051C9.33768 7.76913 8.43092 7.76913 7.85227 7.22051L1.92297 1.59897'
          stroke='#A5A5A5'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <select
        className={`input select ${selectedValue === "" ? "select-placeholder" : "select-option"}`}
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}>
        <option
          value=''
          disabled
          hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
