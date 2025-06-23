import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

import { appRoutesText } from './text.json';

const Alarm = React.lazy(() =>
    import('Widget/Alarm').then(() => ({
        default: (props) => <widget-alarm {...props}></widget-alarm>
    }))
);
const DatabricksWidget = React.lazy(() =>
    import('Widget/DatabricksDashboard').then(() => ({
        default: (props) => <databricks-dashboard {...props}></databricks-dashboard>
    }))
);
const EnergyGauge = React.lazy(() =>
    import('Widget/EnergyGauge').then(() => ({
        default: (props) => <energy-gauge {...props}></energy-gauge>
    }))
);
const InfoCard = React.lazy(() =>
    import('Widget/InfoCard').then(() => ({
        default: ({ icon: Icon, ...p }) => (
            <info-card {...p}>{Icon && <Icon slot="icon" />}</info-card>
        )
    }))
);
const loadIcon = (iconName) =>
    React.lazy(() =>
        import('Widget/InfoCard').then((module) => ({
            default: (props) => (
                <span
                    {...props}
                    dangerouslySetInnerHTML={{ __html: module[iconName] }}
                />
            )
        }))
    );

const FireIcon = loadIcon('FireIcon');
const WaterIcon = loadIcon('WaterIcon');
const BatteryIcon = loadIcon('BatteryIcon');
const TemperatureIcon = loadIcon('TemperatureIcon');
const StarIcon = loadIcon('StarIcon');
const PersonIcon = loadIcon('PersonIcon');
const ChairIcon = loadIcon('ChairIcon');

export const NAVIGATION_CONFIG = Object.freeze({
    HOME: { name: appRoutesText.home, path: '/' },
    NAV2: { name: appRoutesText.databricks, path: '/databricks' },
    NAV3: { name: appRoutesText.nav3, path: '/navigation3' }
});

export const FOOTER_CONFIG = Object.freeze({
    POLICY: {
        name: appRoutesText.policy,
        path: '/policy'
    },
    TERMS: {
        name: appRoutesText.terms,
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
                        <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-[auto_auto] md:grid-cols-[auto_1fr] md:grid-rows-[auto]">
                            <Suspense
                                fallback={<div>{appRoutesText.loadingWidgets}</div>}
                            >
                                <div className="flex flex-wrap gap-4">
                                    <Alarm />
                                    <EnergyGauge
                                        usage={5750.23}
                                        maxUsage={6000}
                                        buildingName={appRoutesText.building1}
                                    />
                                </div>
                                <div className="flex flex-wrap content-start justify-start gap-2">
                                    <InfoCard
                                        icon={FireIcon}
                                        label={appRoutesText.building1a}
                                        value="512 ft³"
                                    />
                                    <InfoCard
                                        icon={WaterIcon}
                                        label={appRoutesText.building1a}
                                        value="293.6 gal"
                                    />
                                    <InfoCard
                                        icon={BatteryIcon}
                                        label={appRoutesText.backupBattery}
                                        value="54%"
                                    />
                                    <InfoCard
                                        icon={TemperatureIcon}
                                        label={appRoutesText.room1}
                                        value="72 °F"
                                    />
                                    <InfoCard
                                        icon={StarIcon}
                                        label={appRoutesText.energyRating}
                                        value="8.5"
                                    />
                                    <InfoCard
                                        icon={PersonIcon}
                                        label={appRoutesText.staff}
                                        value="5"
                                    />
                                    <InfoCard
                                        icon={ChairIcon}
                                        label={appRoutesText.vacancy}
                                        value="12"
                                    />
                                </div>
                            </Suspense>
                        </div>
                    }
                />
                <Route
                    path={NAVIGATION_CONFIG.NAV2.path}
                    element={
                        <Suspense fallback={<div>Loading Databricks Widget</div>}>
                            <div className="h-full">
                                <DatabricksWidget
                                    src="https://dbc-b79f98ff-f7c9.cloud.databricks.com/embed/dashboardsv3/01f0253b57821d6594e100fd03dab0c2?o=8585847403201286"
                                    onLoad={() => console.log('Iframe loaded')}
                                    onError={(error) => console.error(error)}
                                />
                            </div>
                        </Suspense>
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
