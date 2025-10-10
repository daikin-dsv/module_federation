'use client';

import { ReactNode, HTMLAttributes } from 'react';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export interface ActiveLinkProps extends LinkProps {
    href: string;
    children: ReactNode;
}

// Wrap NavLink so that it adds an `active` attribute when its `to` matches the current path
const ActiveLink = ({
    href,
    children,
    ...props
}: ActiveLinkProps & HTMLAttributes<HTMLAnchorElement>) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} {...(isActive ? { active: '' } : {})} {...props}>
            {children}
        </Link>
    );
};

export default ActiveLink;
