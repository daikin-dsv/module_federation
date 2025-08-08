import "@daikin-oss/design-system-web-components/components/tab/index.js";
import "@daikin-oss/design-system-web-components/components/tabs/index.js";
import "@daikin-oss/design-system-web-components/components/tab-panels/index.js";

import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import { rightPanel } from '../text.json';

export class RightPanel extends LitElement {
    static properties = {
        open: { type: Boolean },
        data: { type: Object }
    };

    constructor() {
        super();
        this.open = false;
        this.data = {};
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
                                ${this._renderDescriptionList(this.data)}
                            </daikin-tab-panels>
                    </daikin-tabs>
                </div>
            `
            : html``;
    }

    _renderDescriptionList(data) {
        return html`
            <dl slot="panel:info" class="m-1">
                ${Object.keys(data).map(property => html`
                    <dt class=" font-bold mt-4">
                        ${rightPanel[property] || property}
                    </dt>
                    <dd>
                        ${data[property]}
                    </dd>
                `)}
            </dl>
        `;
    }
}

customElements.define('right-panel', RightPanel);
