import '@daikin-oss/design-system-web-components/components/button/index.js';
import { render, html } from 'lit';

import './components/Alarm.js';
import './components/EnergyGauge.js';
import { WaterIcon } from './components/InfoCard.js';
import './components/Light.js';
import './components/ConfirmationWindow.js';
import './components/RightPanel.js';
import './index.css';
import { bootstrapText, lightText } from './text.json';

const root = document.getElementById('root');
root.replaceChildren();

const cumulativeData = {
    threshold: '1500',
    aggregate: '2500'
};

const instantaneousData = {
    min: '10',
    max: '100',
    span: '30'
};

let showConfirmation = false;
let rightPanelOpen = false;
let rightPanelData = cumulativeData;

function update() {
    render(
        html`
            <div class="grid ${rightPanelOpen ? 'grid-cols-[1fr_400px]' : 'grid-cols-1'} grid-rows-1 gap-x-5 gap-y-0">
            <div>
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
            <daikin-button
                @click=${() => { showConfirmation = true; update(); }}
                data-testid="confirmation-button"
            >
                Confirm
            </daikin-button>
            <widget-confirmation-window
                .open=${showConfirmation}
                @cancel=${() => { showConfirmation = false; update(); }}
                @confirm=${() => {
                    showConfirmation = false;
                    update();
                }}
            ></widget-confirmation-window>
            <daikin-button
                @click=${() => {
                rightPanelOpen = !rightPanelOpen;
                rightPanelData = cumulativeData;
                update();

            }}
                data-testid="toggle-right-panel-button-cumulative"
            >
                Toggle Cumulative Right Panel
            </daikin-button>
            <daikin-button
                @click=${() => {
                rightPanelOpen = !rightPanelOpen;
                rightPanelData = instantaneousData;
                update();
            }}
                data-testid="toggle-right-panel-button-instantaneous"
            >
                Toggle Instantaneous Right Panel
            </daikin-button>
            </div>

            <right-panel 
                .open=${rightPanelOpen}
                .data=${rightPanelData}
            ></right-panel>
            <div>
        `, root);
}

update();
