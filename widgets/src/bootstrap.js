import React from 'react';
import { createRoot } from 'react-dom/client';

import Alarm from './components/Alarm';
import EnergyGauge from './components/EnergyGauge';
import InfoCard, { WaterIcon } from './components/InfoCard';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <>
        <Alarm />
        <EnergyGauge usage={1000} maxUsage={4000} buildingName="DSV" />
        <InfoCard icon={WaterIcon} label="Water" value="512 ft³" />
    </>
);
