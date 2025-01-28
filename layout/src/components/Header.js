import React from 'react';
import { NavLink, Link } from 'react-router';

import Logo from '../assets/daikin_logo.png';
import '../index.css';
import User from './User';

const Header = ({ navigationItems = [] }) => {
    return (
        <header className="flex flex-row justify-between items-center font-daikinSerif h-16 w-full min-w-[360px] border-b-1 border-(--dds-color-divider) pl-3 pr-4">
            <div className="flex items-center gap-4">
                <Link to={navigationItems[0]?.path} className="flex items-center h-16">
                    <img src={Logo} alt="Daikin" className="h-8 min-w-[115.52px]" />
                </Link>
                <nav>
                    <ul className="flex">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex items-center whitespace-nowrap h-16 px-4 pt-1 text-(--dds-color-common-brand-default) hover:text-(--dds-color-common-brand-hover) focus:text-(--dds-color-common-brand-press) font-(--dds-font-weight-bold) border-b-4 border-(--dds-color-common-brand-default) hover:border-(--dds-color-common-brand-hover) focus:border-(--dds-color-common-brand-press)'
                                        : 'flex items-center whitespace-nowrap h-16 px-4 text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)'
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </ul>
                </nav>
            </div>
            <User />
        </header>
    );
};

export default Header;
