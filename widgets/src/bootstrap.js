import { render, html } from 'lit';

import './components/Alarm.js';
import './components/EnergyGauge.js';
import { WaterIcon } from './components/InfoCard.js';
import './components/Light.js';
import './index.css';
import { bootstrapText, lightText } from './text.json';

const root = document.getElementById('root');
root.replaceChildren();

render(
    html`
        <widget-alarm></widget-alarm>
        <energy-gauge
            usage="1000"
            maxUsage="4000"
            buildingName="${bootstrapText.dsv}"
        ></energy-gauge>
        <info-card label="${bootstrapText.water}" value="512 ft³">
            <span slot="icon" .innerHTML=${WaterIcon}></span>
        </info-card>
        <light-widget label="${bootstrapText.lobby}" .text=${lightText}></light-widget>
    `,
    root
);
