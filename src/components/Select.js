import React from 'react';

const Select = ({ name, value, onChange, options, className}) => (
    <select name={name} value={value} onChange={(e) => onChange(e.target.value)} className={className}>
        {
            options.map((option, index)=> <option value={option} key={index}>{option}</option>)
        }
    </select>
);

export default Select;