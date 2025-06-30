import { LitElement, html, css, unsafeCSS } from 'lit';
import {
    colorBlue50,
    colorCommonBrandDefault,
    colorGray70
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import '../webcomponents';
import tailwindStyles from '../index.css?inline';

export class EnergyGaugeComponent extends LitElement {
    static properties = {
        usage: { type: Number },
        maxUsage: { type: Number },
        buildingName: { type: String }
    };

    constructor() {
        super();
        this.usage = 0;
        this.maxUsage = 0;
        this.buildingName = '';
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    render() {
        const radius = 120;
        const percent = (this.usage / this.maxUsage) * 100;
        const strokeWidth = 10;
        const innerRadius = radius - strokeWidth;
        const circumference = innerRadius * 2 * Math.PI;
        const arc = circumference * 0.75;
        const dashArray = `${arc} ${circumference}`;
        const transform = `rotate(135, ${radius}, ${radius})`;
        const offset = arc - (percent / 100) * arc;

        return html`
            <daikin-card outline class="max-h-[274px]">
                <div class="relative flex h-[240px] w-[240px] items-center justify-center">
                    <svg height="${radius * 2}" width="${radius * 2}">
                        <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="15%" stop-color="${colorCommonBrandDefault}" stop-opacity="1" />
                                <stop offset="85%" stop-color="${colorBlue50}" stop-opacity="1" />
                            </linearGradient>
                        </defs>
                        <circle
                            class="gauge_base"
                            cx="${radius}"
                            cy="${radius}"
                            fill="transparent"
                            r="${innerRadius}"
                            stroke="${colorGray70}"
                            stroke-dasharray="${dashArray}"
                            stroke-linecap="round"
                            stroke-width="15"
                            transform="${transform}"
                        ></circle>
                        <circle
                            class="gauge_percent"
                            cx="${radius}"
                            cy="${radius}"
                            fill="transparent"
                            r="${innerRadius}"
                            stroke="url(#grad)"
                            stroke-dasharray="${dashArray}"
                            stroke-dashoffset="${offset}"
                            stroke-linecap="round"
                            stroke-width="15"
                            transform="${transform}"
                        ></circle>
                    </svg>

                    <div class="absolute flex flex-col items-center justify-center">
                        <svg fill="currentColor" viewBox="0 0 24 24" class="mb-1 h-14 w-14 text-[#0097e0]">
                            <path d="M13 2L3 14H11L9 22L19 10H11L13 2Z" />
                        </svg>
                        <div class="font-medium text-gray-800">
                            ${this.usage.toFixed(1)} kWh
                        </div>
                        <div class="text-xs text-[#616161]">${this.buildingName}</div>
                    </div>

                    <div class="absolute bottom-2 left-10 text-xs text-[#616161]">0</div>
                    <div class="absolute right-10 bottom-2 text-xs text-[#616161]">${this.maxUsage}</div>
                </div>
            </daikin-card>
        `;
    }
}

customElements.define('energy-gauge', EnergyGaugeComponent);
