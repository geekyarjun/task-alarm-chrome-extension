import React from 'react';

const Button = ({ value, onClick, name, className }) => (
    <button 
        onClick={onClick}
        name={name}
        className={className}
    >{value}</button>
);

export default Button;