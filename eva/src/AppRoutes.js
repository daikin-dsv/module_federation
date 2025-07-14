import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

import { appRoutesText } from './text.json';

export const NAVIGATION_CONFIG = Object.freeze({
    ALERTS: { name: appRoutesText.alerts, path: '/' },
    ALERTSSETTINGS: { name: appRoutesText.alerts, path: '/alertssettings' }
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
                            navigate(NAVIGATION_CONFIG.ALERTS.path);
                        }}
                    >
                        {appRoutesText.home}
                    </daikin-breadcrumb-item>
                    <daikin-breadcrumb-item>
                        {PATH_TO_NAME[location.pathname]}
                    </daikin-breadcrumb-item>
                </daikin-breadcrumb>
            </div>
            <Routes>
                <Route
                    path={NAVIGATION_CONFIG.ALERTS.path}
                    element={
                        <div >
                            <Suspense
                                fallback={<div>{appRoutesText.loadingAlerts}</div>}
                            >
                            </Suspense>
                        </div>
                    }
                />
                <Route
                    path={NAVIGATION_CONFIG.ALERTSSETTINGS.path}
                    element={
                        <div >
                            <Suspense
                                fallback={<div>{appRoutesText.loadingAlertsSettings}</div>}
                            >
                            </Suspense>
                        </div>
                    }
                />
            </Routes>
        </>
    );
};

export default AppRoutes;
