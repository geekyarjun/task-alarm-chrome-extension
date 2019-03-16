import React from 'react';

const Input = React.forwardRef(({ type, placeholder, value, onChange, name, className }, ref) => (
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name={name}
        className={className}
        ref={ref}
    />
));

export default Input;