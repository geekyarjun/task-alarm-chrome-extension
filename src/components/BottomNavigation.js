import React from 'react';

const addPipeBetweenLinks = (links, onClick, active) => {
    return links.map((link, index)=> {

        return (
            <span 
                key={index} 
                onClick={(e) => {
                    e.preventDefault();
                    onClick(link === '|' ? active : link);
                }} 
                className={active === link ? 'activeBottomNav' : ''}
            >
            { link }
            </span>
        )

        // if (index === links.length - 1) return <span key={index} className={active === link ? 'activeBottomNav' : ''} onClick={(e) => {e.preventDefault(); onClick(link)}}>{link}</span>

        // return <span key={index} onClick={(e) => {e.preventDefault(); onClick(link)}} className={active === link ? 'activeBottomNav' : ''}>{link}|</span>
    })
}

const BottomNavigation = ({ links, className, onClick, active }) => (
    <div className={className}>
        {
            addPipeBetweenLinks(links, onClick, active)
        }
    </div>
);

export default BottomNavigation;