import React from 'react';
import { NavLink } from 'react-router';

import User from './User';

const Header = ({ navigationItems = [] }) => {
    return (
        <header>
            From Header.
            <nav>
                <ul>
                    {navigationItems.map((item) => (
                        <NavLink key={item.name} to={item.path}>
                            {item.name}
                        </NavLink>
                    ))}
                </ul>
            </nav>
            <User />
        </header>
    );
};

export default Header;
