import '@daikin-oss/design-system-web-components/components/button/index.js';
import '@daikin-oss/design-system-web-components/components/modal/index.js';
import '@daikin-oss/design-system-web-components/components/modal-footer/index.js';
import '@daikin-oss/design-system-web-components/components/modal-header/index.js';
import '@daikin-oss/design-system-web-components/components/input-group/index.js';
import '@daikin-oss/design-system-web-components/components/text-field/index.js';
import '@daikin-oss/design-system-web-components/components/radio-group/index.js';
import '@daikin-oss/design-system-web-components/components/radio/index.js';

import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import { alertFormModalText } from '../text.json';

export class AlertFormModalComponent extends LitElement {
    static properties = {
        open: { type: Boolean },
        name: { type: String },
        building: { type: String },
        data: { type: String },
        type: { type: String },
        min: { type: String },
        max: { type: String },
        span: { type: String },
        threshold: { type: String },
        aggregate: { type: String }
    };

    constructor() {
        super();
        this.open = false;
        this.name = '';
        this.building = '';
        this.data = '';
        this.type = 'cumulative';
        this.min = '';
        this.max = '';
        this.span = '';
        this.threshold = '';
        this.aggregate = '';
    }

    static styles = css([tailwindStyles]);

    _handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
    }
    _handleConfirm() {
        this.dispatchEvent(new CustomEvent('save', { bubbles: true }));
    }
    _handleInputChange(e) {
        this[e.target.id] = e.target.value;
    }

    _renderCumulativeInputGroup() {
        return html`
            <daikin-input-group
                label=${alertFormModalText.min}
                required="*"
            >
                <daikin-text-field
                    id="min"
                    .value=${this.min}
                    @input=${this._handleInputChange}
                ></daikin-text-field>
            </daikin-input-group>
            <daikin-input-group
                label=${alertFormModalText.max}
                required="*"
            >
                <daikin-text-field
                    id="max"
                    .value=${this.max}
                    @input=${this._handleInputChange}
                ></daikin-text-field>
            </daikin-input-group>
            <daikin-input-group
                label=${alertFormModalText.span}
                required="*"
            >
                <daikin-text-field
                    id="span"
                    .value=${this.span}
                    @input=${this._handleInputChange}
                ></daikin-text-field>
            </daikin-input-group>
        `;
    }

    _renderInstantaneousInputGroup() {
        return html`
            <daikin-input-group
                label=${alertFormModalText.threshold}
                required="*"
            >
                <daikin-text-field
                    id="min"
                    .value=${this.threshold}
                    @input=${this._handleInputChange}
                ></daikin-text-field>
            </daikin-input-group>
            <daikin-input-group
                label=${alertFormModalText.aggregate}
                required="*"
            >
                <daikin-text-field
                    id="max"
                    .value=${this.aggregate}
                    @input=${this._handleInputChange}
                ></daikin-text-field>
            </daikin-input-group>
        `;
    }

    render() {
        return html`
            <daikin-modal
                id="confirmation-window"
                ?open=${this.open}
                persistent
                modal-aria-label="Alert Form Modal"
                modal-role="alertdialog"
            >
                <daikin-modal-header>
                    <div class="flex items-center">
                        ${alertFormModalText.header}
                    </div>
                    <div slot="description">
                        <div class="flex gap-2">
                            <daikin-input-group
                                label=${alertFormModalText.name}
                                required="*"
                            >
                                <daikin-text-field
                                    id="name"
                                    .value=${this.name}
                                    @input=${this._handleInputChange}
                                ></daikin-text-field>
                            </daikin-input-group>
                            <daikin-input-group
                                label=${alertFormModalText.building}
                                required="*"
                            >
                                <daikin-text-field
                                    id="building"
                                    .value=${this.building}
                                    @input=${this._handleInputChange}
                                ></daikin-text-field>
                            </daikin-input-group>
                            <daikin-input-group
                                label=${alertFormModalText.data}
                                required="*"
                            >
                                <daikin-text-field
                                    id="data"
                                    .value=${this.data}
                                    @input=${this._handleInputChange}
                                ></daikin-text-field>
                            </daikin-input-group>
                        </div>
                        <daikin-radio-group
                            label="Type"
                            .value=${this.type}
                            @input=${this._handleInputChange}
                        >
                            <daikin-radio name="type" id="type" value="cumulative" label=${alertFormModalText.cumulative}></daikin-radio>
                            <daikin-radio name="type" id="type" value="instantaneous" label=${alertFormModalText.instantaneous}></daikin-radio>
                        </daikin-radio-group>
                        <div class="flex gap-2">
                            ${this.type === 'cumulative'
                ? this._renderCumulativeInputGroup()
                : this._renderInstantaneousInputGroup()
            }
                        </div>
                    </div>
                </daikin-modal-header>
                <daikin-modal-footer>
                    <daikin-button @click=${this._handleCancel} variant="outline">
                        ${alertFormModalText.cancel}
                    </daikin-button>
                    <daikin-button @click=${this._handleConfirm}>
                        ${alertFormModalText.save}
                    </daikin-button>
                </daikin-modal-footer>
            </daikin-modal>
        `;
    }
}

customElements.define('alert-form-modal', AlertFormModalComponent);
