import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router';
import { useLocation, useNavigate } from 'react-router';

const Widget1 = React.lazy(() => import('Widget/widget1'));

export const NAVIGATION_CONFIG = Object.freeze({
    HOME: { name: 'Home', path: '/' },
    NAV2: { name: 'Navigation 2', path: '/navigation2' },
    NAV3: { name: 'Navigation 3', path: '/navigation3' }
});

const PATH_TO_NAME = Object.keys(NAVIGATION_CONFIG).reduce((prev, current) => {
    prev[NAVIGATION_CONFIG[current].path] = NAVIGATION_CONFIG[current].name;
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
                        <div className="flex flex-col justify-center items-center mt-[400px]">
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
            </Routes>
        </>
    );
};

export default AppRoutes;
