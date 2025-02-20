import React, { Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router';

const Alarm = React.lazy(() => import('Widget/Alarm'));
const Light = React.lazy(() => import('Widget/Light'));
const EnergyGauge = React.lazy(() => import('Widget/EnergyGauge'));
const InfoCard = React.lazy(() => import('Widget/InfoCard'));
const loadIcon = (iconName) =>
    React.lazy(() =>
        import('Widget/InfoCard').then((module) => ({
            default: module[iconName]
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
    HOME: { name: 'ホーム', path: '/' },
    NAV2: { name: 'ナビゲーション 2', path: '/navigation2' },
    NAV3: { name: 'ナビゲーション 3', path: '/navigation3' }
});

export const FOOTER_CONFIG = Object.freeze({
    POLICY: {
        name: 'プライバシー',
        path: '/policy'
    },
    TERMS: {
        name: '利用規約',
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
                            <Suspense fallback={<div>Loading Widget 1</div>}>
                                <div className="flex flex-wrap gap-4">
                                    <Alarm count={0} color={'green'} language="ja" />
                                    <Light label="知識の森" language="ja" />
                                    <EnergyGauge
                                        usage={3940.23}
                                        maxUsage={7500}
                                        buildingName="ビル 1"
                                    />
                                </div>
                                <div className="flex flex-wrap content-start justify-start gap-2">
                                    <InfoCard
                                        icon={FireIcon}
                                        label="ビルA"
                                        value="47.6 m²"
                                    />
                                    <InfoCard
                                        icon={WaterIcon}
                                        label="ビルA"
                                        value="1111 L"
                                    />
                                    <InfoCard
                                        icon={BatteryIcon}
                                        label="非常用電源"
                                        value="54%"
                                    />
                                    <InfoCard
                                        icon={TemperatureIcon}
                                        label="会議室 2"
                                        value="22℃"
                                    />
                                    <InfoCard
                                        icon={StarIcon}
                                        label="エネルギー評価"
                                        value="9.5"
                                    />
                                    <InfoCard
                                        icon={PersonIcon}
                                        label="スタッフ"
                                        value="25"
                                    />
                                    <InfoCard icon={ChairIcon} label="空席" value="12" />
                                </div>
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
