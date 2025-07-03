
import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

function getPathToName(navConfig) {
    return Object.keys(navConfig).reduce((prev, current) => {
        prev[navConfig[current].path] = navConfig[current].name;
        return prev;
    }, {});
}

const AppRoutes = ({ text, NAVIGATION_CONFIG }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const PATH_TO_NAME = getPathToName(NAVIGATION_CONFIG);

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
                        {text.home}
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
                                fallback={<div>{text.loadingAlerts}</div>}
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
