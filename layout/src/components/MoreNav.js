import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';

export class MoreNav extends LitElement {
    static properties = {
        parentNav: { type: String },
        childrenNavArr: { type: Array }
    };

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    constructor() {
        super();
        this.parentNav = '';
        this.childrenNavArr = [];
        this.isOpen = false;
    }

    _toggleOpen() {
        this.isOpen = !this.isOpen;
        this.requestUpdate();
    }

    render() {
        console.log('MoreNav render', this.parentNav, this.childrenNavArr);
        return html`
            <button
                class="flex h-16 items-center justify-center gap-2 break-keep text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)"
                @click="${this._toggleOpen}"
                aria-haspopup="true"
                aria-expanded="${this.isOpen}"
                aria-controls="more-overflow"
            >
                ${this.parentNav}
                <daikin-icon
                    color="current"
                    icon="chevron-down"
                    size="xl"
                ></daikin-icon>
            </button>
            <div
                id="more-overflow"
                class="${this.isOpen
                    ? 'visible'
                    : 'invisible'} absolute top-[48px] right-[55px] bottom-auto left-auto border border-solid border-[var(--dds-color-divider)]"
            >
                <daikin-card>
                    <daikin-list class="overflow-list" role="menu">
                        ${this.childrenNavArr?.map(
                            (item) => html`
                                <slot name="overflow-route" .item=${item}></slot>
                            `
                        )}
                    </daikin-list>
                </daikin-card>
            </div>
        `;
    }
}

customElements.define('more-nav', MoreNav);
