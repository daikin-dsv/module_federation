import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { debounce } from 'lodash';

import Logo from '../assets/daikin_logo.png';
import '../index.css';
import '../webcomponents';
import User from './User';

const Header = ({ navigationItems = [], language }) => {
    const [showMore, setShowMore] = useState(false);
    const [overflowIndex, setOverflowIndex] = useState(0);
    const navItemsRef = useRef([]);

    useEffect(() => {
        const container = navItemsRef.current;
        const resizeObserver = new ResizeObserver(
            debounce((entries) => {
                const children = entries[0]?.target?.children;
                for (let i = 1; i < children?.length; ++i) {
                    const previousTop = children[i - 1]?.getBoundingClientRect().top;
                    const currentTop = children[i]?.getBoundingClientRect().top;
                    if (previousTop !== currentTop) {
                        setOverflowIndex(i);
                        setShowMore(true);
                        return;
                    }
                }
                setShowMore(false);
            }, 100)
        );

        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    }, []);

    return (
        <header className="font-daikinSerif flex h-16 w-full min-w-[360px] flex-row items-center justify-between border-b-1 border-(--dds-color-divider) pr-4 pl-3">
            <div className="flex items-center gap-4">
                <Link to={navigationItems[0]?.path} className="flex h-16 items-center">
                    <img src={Logo} alt="Daikin" className="h-8 min-w-[115.52px]" />
                </Link>
                <nav className="flex">
                    <ul
                        className="flex max-h-16 flex-wrap overflow-hidden"
                        ref={navItemsRef}
                    >
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex h-16 grow items-center justify-center border-b-4 border-(--dds-color-common-brand-default) px-4 pt-1 font-(--dds-font-weight-bold) text-(--dds-color-common-brand-default) hover:border-(--dds-color-common-brand-hover) hover:text-(--dds-color-common-brand-hover) focus:border-(--dds-color-common-brand-press) focus:text-(--dds-color-common-brand-press)'
                                        : 'flex h-16 grow items-center justify-center px-4 text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)'
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </ul>
                    {showMore && (
                        <Popover>
                            <PopoverButton className="focus:outline-none">
                                <div className="flex h-16 items-center justify-center gap-2 px-4 text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)">
                                    {language === 'ja' ? 'もっと' : 'More'}
                                    <daikin-icon
                                        color="current"
                                        icon="chevron-down"
                                        size="xl"
                                    ></daikin-icon>
                                </div>
                            </PopoverButton>
                            <PopoverPanel anchor="bottom end" className="shadow">
                                {({ close }) => (
                                    <daikin-card className="-mx-4 flex flex-col">
                                        <daikin-list>
                                            {navigationItems
                                                .slice(
                                                    overflowIndex,
                                                    navigationItems.length
                                                )
                                                .map((item) => (
                                                    <NavLink
                                                        key={item.name}
                                                        to={item.path}
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? 'flex h-full w-full items-center p-3 font-(--dds-font-weight-bold) text-(--dds-color-common-brand-default) hover:bg-(--dds-color-common-surface-hover) hover:text-(--dds-color-common-brand-hover) focus:text-(--dds-color-common-brand-press) active:bg-(--dds-color-common-surface-press)'
                                                                : 'flex h-full w-full items-center p-3 text-(--dds-color-common-neutral-default) hover:bg-(--dds-color-common-surface-hover) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press) active:bg-(--dds-color-common-surface-press)'
                                                        }
                                                        onClick={() => close()}
                                                    >
                                                        {item.name}
                                                    </NavLink>
                                                ))}
                                        </daikin-list>
                                    </daikin-card>
                                )}
                            </PopoverPanel>
                        </Popover>
                    )}
                </nav>
            </div>
            <User language={language} />
        </header>
    );
};

export default Header;
