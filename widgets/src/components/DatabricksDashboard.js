import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';

/**
 * Simple iframe wrapper for Databricks embed URLs.
 *
 * @param {{src: string, width?: string, height?: number, onLoad?: function, onError?: function}} props
 * @param {string} props.src - Embed URL with embedded credentials or one-time token.
 * @param {string} [props.width='100%'] - CSS width for the iframe.
 * @param {number} [props.height='100%'] - Height in pixels for the iframe.
 * @param {Function} [props.onLoad] - Callback when iframe loads.
 * @param {Function} [props.onError] - Callback when iframe errors.
 */
export class DatabricksWidget extends LitElement {
    static properties = {
        src: { type: String },
        width: { type: String },
        height: { type: String }
    };

    constructor() {
        super();
        this.src = '';
        this.width = '100%';
        this.height = '100%';
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    firstUpdated() {
        const iframe = this.shadowRoot.querySelector('iframe');
        if (!iframe) return;
        iframe.addEventListener('load', () => {
            this.dispatchEvent(new CustomEvent('load'));
        });
        iframe.addEventListener('error', () => {
            this.dispatchEvent(new CustomEvent('error'));
        });
    }

    render() {
        return html`<iframe
            src="${this.src}"
            width="${this.width}"
            height="${this.height}"
            allowfullscreen
        ></iframe>`;
    }
}

customElements.define('databricks-dashboard', DatabricksWidget);
