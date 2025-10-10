'use client';

import { useMemo } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import {
    DaikinBreadcrumbReact,
    DaikinBreadcrumbItemReact
} from './components/dds-wrappers';

type BreadcrumbItem = {
    href: string;
    label: string;
};

type BreadcrumbConfig = Record<string, BreadcrumbItem[]>;

type BreadcrumbNavProps = {
    config: BreadcrumbConfig;
};

const HOME_PATH = '/';

function normalizePath(pathname: string | null): string {
    if (!pathname) {
        return HOME_PATH;
    }

    if (pathname.length > 1 && pathname.endsWith('/')) {
        return pathname.slice(0, -1);
    }

    return pathname;
}

export default function BreadcrumbNav({ config }: BreadcrumbNavProps) {
    const pathname = usePathname();
    const router = useRouter();
    const normalizedPath = normalizePath(pathname);

    const items = useMemo(() => {
        if (config[normalizedPath]) {
            return config[normalizedPath];
        }

        return config[HOME_PATH] ?? [];
    }, [config, normalizedPath]);

    if (!items.length) {
        return null;
    }

    return (
        <div className="mb-2">
            <DaikinBreadcrumbReact>
                {items.map(({ href, label }, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <DaikinBreadcrumbItemReact
                            key={href}
                            href={href}
                            variant={isLast ? 'current' : 'normal'}
                            aria-current={isLast ? 'page' : undefined}
                            onClick={(event) => {
                                if (isLast) {
                                    return;
                                }

                                event.preventDefault();
                                router.push(href);
                            }}
                        >
                            {label}
                        </DaikinBreadcrumbItemReact>
                    );
                })}
            </DaikinBreadcrumbReact>
        </div>
    );
}
