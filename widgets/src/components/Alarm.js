import '@daikin-oss/design-system-web-components/components/card/index.js';
import '@daikin-oss/design-system-web-components/components/icon/index.js';
import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import { alarmText } from '../text.json';

const COLORS = {
    red: 'text-[#f21a27]',
    yellow: 'text-[#b88700]',
    green: 'text-[#008f7e]'
};

export class AlarmComponent extends LitElement {
    static properties = {
        count: { type: Number },
        color: { type: String },
        text: { type: Object }
    };

    constructor() {
        super();
        this.count = 1;
        this.color = 'red';
        this.text = alarmText;
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    render() {
        return html`
            <daikin-card outline class="max-h-[274px]">
                <div
                    class="flex h-[240px] w-[240px] flex-col items-center justify-center"
                >
                    <div class="${COLORS[this.color]} mb-2 h-40 w-40">
                        <daikin-icon
                            icon="alarm"
                            color="current"
                            size="current"
                        ></daikin-icon>
                    </div>
                    <div class="flex flex-col items-center text-gray-700">
                        <div class="font-bold">${this.count}</div>
                        <div>
                            ${this.count === 1 ? this.text.alarm : this.text.alarms}
                        </div>
                    </div>
                </div>
            </daikin-card>
        `;
    }
}

customElements.define('widget-alarm', AlarmComponent);
