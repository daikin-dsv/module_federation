import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';

export class NavMenu extends LitElement {
    static properties = {
        parentNav: { type: String }
    };

    static styles = css`
        ${unsafeCSS(tailwindStyles)}

        /* Child nav slot common styling */
        :host ::slotted([slot='child-nav']) {
            display: flex !important;
            height: 100% !important;
            width: 100% !important;
            align-items: center !important;
            padding: 0.75rem !important;
            white-space: nowrap !important;
            color: var(--dds-color-common-neutral-default) !important;
        }

        /* Active child nav item styling */
        :host ::slotted([slot='child-nav'][active]) {
            font-weight: var(--dds-font-weight-bold) !important;
            color: var(--dds-color-common-brand-default) !important;
        }
        :host ::slotted([slot='child-nav'][active]:hover) {
            background-color: var(--dds-color-common-surface-hover) !important;
            color: var(--dds-color-common-brand-hover) !important;
        }
        :host ::slotted([slot='child-nav'][active]:focus) {
            color: var(--dds-color-common-brand-press) !important;
            outline: none !important;
        }
        :host ::slotted([slot='child-nav'][active]:active) {
            background-color: var(--dds-color-common-surface-press) !important;
        }

        /* Inactive child nav item styling */
        :host ::slotted([slot='child-nav']:not([active]):hover) {
            background-color: var(--dds-color-common-surface-hover) !important;
            color: var(--dds-color-common-neutral-hover) !important;
        }
        :host ::slotted([slot='child-nav']:not([active]):focus) {
            color: var(--dds-color-common-neutral-press) !important;
            outline: none !important;
        }
        :host ::slotted([slot='child-nav']:not([active]):active) {
            background-color: var(--dds-color-common-surface-press) !important;
        }
    `;

    constructor() {
        super();
        this.parentNav = '';
    }

    firstUpdated() {
        const slot = this.shadowRoot.querySelector('slot[name="child-nav"]');
        // One observer reused for all children
        const mutationObserver = new MutationObserver(() => this.requestUpdate());
        // Observe slot changes to update button style when active child changes
        //   (re)‑attach the observer whenever the slot's content changes
        const observeChildren = () => {
            mutationObserver.disconnect();
            const nodes = slot?.assignedElements ? slot.assignedElements() : [];
            nodes.forEach((node) => {
                const mutationOpts = { attributeFilter: ['active'] };
                mutationObserver.observe(node, mutationOpts);
            });
            // Make sure the first render is correct too
            this.requestUpdate();
        };
        slot?.addEventListener('slotchange', observeChildren);
        observeChildren();
    }

    get _hasActiveChild() {
        // Check if any slotted child-nav element has the 'active' attribute
        const slot = this.shadowRoot.querySelector('slot[name="child-nav"]');
        if (!slot) return false;
        const nodes = slot.assignedElements ? slot.assignedElements() : [];
        return nodes.some((el) => el.hasAttribute('active'));
    }

    render() {
        const buttonClass = [
            'flex h-16 items-center justify-center gap-2 break-keep -mx-4 px-4 hover:cursor-pointer',
            this._hasActiveChild
                ? 'text-(--dds-color-common-brand-default) font-(--dds-font-weight-bold) border-b-4 pt-1 hover:text-(--dds-color-common-brand-hover) focus:text-(--dds-color-common-brand-press) focus:outline-none active:bg-(--dds-color-common-surface-press)'
                : 'text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)'
        ].join(' ');

        return html`
            <daikin-menu>
                <button class=${buttonClass} data-testId="parent-nav-button">
                    ${this.parentNav}
                    <daikin-icon
                        color="current"
                        icon="chevron-down"
                        size="xl"
                    ></daikin-icon>
                </button>
                <daikin-list slot="menu" data-testId="children-nav-menu">
                    <!-- Need the href to enable the onClick handler in react // Will need
                    to refactor this so that the application enters the list items // DDS
                    throws an error if daikin-list does not have any items // Will file
                    bug ticket -->
                    <daikin-list-item type="link" href="/">
                        <slot name="child-nav"></slot>
                    </daikin-list-item>
                </daikin-list>
            </daikin-menu>
        `;
    }
}

customElements.define('nav-menu', NavMenu);
