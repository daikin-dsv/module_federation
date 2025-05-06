import React from 'react';
import { createRoot } from 'react-dom/client';

import Alarm from './components/Alarm';
import EnergyGauge from './components/EnergyGauge';
import InfoCard, { WaterIcon } from './components/InfoCard';
import Light from './components/Light';
import './index.css';
import { bootstrapText } from './text.json';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <>
        <Alarm />
        <EnergyGauge usage={1000} maxUsage={4000} buildingName={bootstrapText.dsv} />
        <InfoCard icon={WaterIcon} label={bootstrapText.water} value="512 ft³" />
        <Light label={bootstrapText.lobby} />
    </>
);
