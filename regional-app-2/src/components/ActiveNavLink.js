import React from 'react';
import { NavLink, useLocation } from 'react-router';

// Wrap NavLink so that it adds an `active` attribute when its `to` matches the current path
const ActiveNavLink = ({ to, children, ...props }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink to={to} {...(isActive ? { active: '' } : {})} {...props}>
            {children}
        </NavLink>
    );
};

export default ActiveNavLink;
