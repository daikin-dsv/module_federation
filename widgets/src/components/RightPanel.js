import "@daikin-oss/design-system-web-components/components/tab/index.js";
import "@daikin-oss/design-system-web-components/components/tabs/index.js";
import "@daikin-oss/design-system-web-components/components/tab-panels/index.js";

import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import { rightPanel } from '../text.json';

export class RightPanel extends LitElement {
    static properties = {
        open: { type: Boolean },
        type: { type: String },
        threshold: { type: Number },
        aggregate: { type: Number },
        min: { type: Number },
        max: { type: Number },
        span: { type: Number }
    };

    constructor() {
        super();
        this.open = false;
        // 'cumulative' or 'instantaneous'
        this.type = 'cumulative';
        this.threshold = 0;
        this.aggregate = 0;
        this.min = 0;
        this.max = 0;
        this.span = 0;
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    render() {
        return this.open
            ? html`
                <div class="w-100 h-full border-l border-gray-200 p-1 overflow-y-auto">
                    <daikin-tabs value="info">
                        <daikin-tab value="info">
                            <h2>${rightPanel.info}</h2>
                        </daikin-tab>
                            <daikin-tab-panels slot="panels">
                                ${this.type === 'cumulative'
                    ? this._renderCumulative()
                    : this._renderInstantaneous()}
                            </daikin-tab-panels>
                    </daikin-tabs>
                </div>
            `
            : html``;
    }

    _renderDescriptionList(properties) {
        return html`
            <dl slot="panel:info" class="m-1">
            ${properties.map(property => html`
                    <dt class=" font-bold mt-4">
                        ${rightPanel[property]}
                    </dt>
                    <dd>
                        ${this[property]}
                    </dd>
                `)
            }
            </dl >
            `;
    }


    _renderCumulative() {
        const cumulativeProperties = ['threshold', 'aggregate'];

        return html`
            ${this._renderDescriptionList(cumulativeProperties)}
        `;
    }

    _renderInstantaneous() {
        const instantaneousProperties = ['min', 'max', 'span'];
        return html`
            ${this._renderDescriptionList(instantaneousProperties)}
        `;
    }
}

customElements.define('right-panel', RightPanel);
