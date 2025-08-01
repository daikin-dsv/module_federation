import '@daikin-oss/design-system-web-components/components/button/index.js';
import '@daikin-oss/design-system-web-components/components/icon/index.js';
import "@daikin-oss/design-system-web-components/components/modal/index.js";
import "@daikin-oss/design-system-web-components/components/modal-footer/index.js";
import "@daikin-oss/design-system-web-components/components/modal-header/index.js";
import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import { confirmationWindowText } from '../text.json';

const COLORS = {
    red: 'text-[#f21a27]',
    yellow: 'text-[#b88700]'
};

export class ConfirmationWindowComponent extends LitElement {
    static properties = {
        open: { type: Boolean },
        danger: { type: Boolean },
        text: { type: Object }
    };

    constructor() {
        super();
        this.open = false;
        this.danger = false;
        this.text = confirmationWindowText;
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    _handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel', { bubbles: true }));
    }

    _handleConfirm() {
        this.dispatchEvent(new CustomEvent('confirm', { bubbles: true }));
    }

    render() {
        return html`
            <daikin-modal
                id="confirmation-window"
                ?open=${this.open}
                persistent
                modal-aria-label="Confirmation window"
                modal-role="alertdialog"
            >
                <daikin-modal-header>
                    <div class="flex items-center" data-testid="confirmation-window-header">
                        <div class="${this.danger ? COLORS.red : COLORS.yellow} h-8 w-8 mr-2">
                            <daikin-icon
                                icon="warning"
                                color="current"
                                size="current"
                            ></daikin-icon>
                        </div>
                        <span>${this.text.header}</span>
                    </div>
                    <span slot="description" data-testid="confirmation-window-description">${this.text.description}</span>
                </daikin-modal-header>
                <daikin-modal-footer>
                    <daikin-button @click=${this._handleCancel} variant="outline" data-testid="confirmation-window-cancel-button">
                        ${this.text.cancel}
                    </daikin-button>
                    <daikin-button @click=${this._handleConfirm} color="${this.danger ? 'danger' : 'default'}" data-testid="confirmation-window-confirm-button">
                        ${this.text.confirm}
                    </daikin-button>
                </daikin-modal-footer>
            </daikin-modal>
        `;
    }
}

customElements.define('widget-confirmation-window', ConfirmationWindowComponent);
