import { LitElement, html, css, unsafeCSS } from 'lit';
import '../webcomponents';
import tailwindStyles from '../index.css?inline';

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
        return html`<iframe src="${this.src}" width="${this.width}" height="${this.height}" allowfullscreen></iframe>`;
    }
}

customElements.define('databricks-dashboard', DatabricksWidget);
