import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

const Widget1 = React.lazy(() => import('Widget/widget1'));

export const NAVIGATION_CONFIG = Object.freeze({
    HOME: { name: 'Home', path: '/' },
    NAV2: { name: 'Navigation 2', path: '/navigation2' },
    NAV3: { name: 'Navigation 3', path: '/navigation3' }
});

export const FOOTER_CONFIG = Object.freeze({
    POLICY: {
        name: 'Privacy Policy',
        path: '/policy'
    },
    TERMS: {
        name: 'Terms of Use',
        path: '/terms'
    }
});

const COMBINED_CONFIG = {
    ...NAVIGATION_CONFIG,
    ...FOOTER_CONFIG
};

const PATH_TO_NAME = Object.keys(COMBINED_CONFIG).reduce((prev, current) => {
    prev[COMBINED_CONFIG[current].path] = COMBINED_CONFIG[current].name;
    return prev;
}, {});

const AppRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
            <div className="mb-2">
                <daikin-breadcrumb>
                    <daikin-breadcrumb-item
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            navigate(NAVIGATION_CONFIG.HOME.path);
                        }}
                    >
                        {NAVIGATION_CONFIG.HOME.name}
                    </daikin-breadcrumb-item>
                    <daikin-breadcrumb-item>
                        {PATH_TO_NAME[location.pathname]}
                    </daikin-breadcrumb-item>
                </daikin-breadcrumb>
            </div>
            <Routes>
                <Route
                    path={NAVIGATION_CONFIG.HOME.path}
                    element={
                        <div className="mt-[400px] flex flex-col items-center justify-center">
                            <div>Regional App Contents</div>
                            <Suspense fallback={<div>Loading Widget 1</div>}>
                                <Widget1 />
                            </Suspense>
                        </div>
                    }
                />
                <Route
                    path={NAVIGATION_CONFIG.NAV2.path}
                    element={
                        <>
                            <div>{NAVIGATION_CONFIG.NAV2.name}</div>
                        </>
                    }
                />
                <Route
                    path={NAVIGATION_CONFIG.NAV3.path}
                    element={
                        <>
                            <div>{NAVIGATION_CONFIG.NAV3.name}</div>
                        </>
                    }
                />
                <Route
                    path={FOOTER_CONFIG.POLICY.path}
                    element={
                        <>
                            <div>{FOOTER_CONFIG.POLICY.name}</div>
                        </>
                    }
                />
                <Route
                    path={FOOTER_CONFIG.TERMS.path}
                    element={
                        <>
                            <div>{FOOTER_CONFIG.TERMS.name}</div>
                        </>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
