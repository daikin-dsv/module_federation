import React from 'react';
import { Link } from 'react-router';

import '../index.css';

const currentYear = new Date().getFullYear();

const Footer = ({ copyright = `${currentYear} Daikin`, footerItems = [] }) => {
    return (
        <footer className="font-daikinSerif mobile:grid mobile:grid-cols-2 mobile:justify-between mobile:items-start flex w-full min-w-[360px] flex-col-reverse items-center justify-center gap-4 bg-(--dds-color-gray-120) p-4 text-(length:--dds-font-size-300) text-(--dds-color-common-text-inverse)">
            <div>{`© ${copyright}`}</div>
            <div className="mobile:justify-end flex flex-wrap justify-center gap-3">
                {footerItems.map((item) => (
                    <Link key={item.name} to={item.path} className="text-nowrap">
                        {item.name}
                    </Link>
                ))}
            </div>
        </footer>
    );
};

export default Footer;
