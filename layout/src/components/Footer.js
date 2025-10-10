import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';
import text from '../text.json';

/**
 * @typedef {Object} FooterText
 * @property {string} copyright
 */

/** @type {FooterText} */
const defaultFooterText = {
    copyright: text.footerText?.copyright ?? text.footerText.daikin
};

export class FooterComponent extends LitElement {
    static properties = {
        copyright: { type: String }
    };

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    constructor() {
        super();

        const year = new Date().getFullYear();
        this.copyright = `${year} ${defaultFooterText.copyright}`;
    }

    render() {
        return html`
            <footer
                class="font-daikinSerif mobile:grid mobile:grid-cols-2 mobile:justify-between mobile:items-start max-mobile:flex w-full min-w-[360px] flex-col-reverse items-center justify-center gap-4 bg-(--dds-color-gray-120) p-4 text-(length:--dds-font-size-300) text-(--dds-color-common-text-inverse)"
            >
                <div>© ${this.copyright}</div>
                <div
                    class="mobile:justify-end max-mobile:justify-center flex flex-wrap gap-3"
                >
                    <slot name="footer-items"></slot>
                </div>
            </footer>
        `;
    }
}

if (!customElements.get('app-footer')) {
    customElements.define('app-footer', FooterComponent);
}
