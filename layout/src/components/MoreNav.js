import { LitElement, html, css, unsafeCSS } from 'lit';

import tailwindStyles from '../index.css?inline';

export class MoreNav extends LitElement {
    static properties = {
        parentNav: { type: String },
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
        this.isOpen = false;
    }

    firstUpdated() {
        console.log('MoreNav firstUpdated');
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                console.log('Window resized, repositioning popover');
                this._positionPopover();
            }
        });
        const slot = this.shadowRoot.querySelector('slot[name="child-nav"]');
        console.log('MoreNav updateSlot', { slot });
        // One observer reused for all children
        const mutationObserver = new MutationObserver(() => this.requestUpdate());
        // Observe slot changes to update button style when active child changes
        //   (re)‑attach the observer whenever the slot's content changes
        const observeChildren = () => {
            mutationObserver.disconnect();
            const nodes = slot.assignedElements ? slot.assignedElements() : [];
            console.log('Assigned child-nav elements:', nodes);
            nodes.forEach((node) => {
                const mutationOpts = { attributeFilter: ['active'] };
                mutationObserver.observe(node, mutationOpts);
            });
            // Make sure the first render is correct too
            this.requestUpdate();
        };
        slot.addEventListener('slotchange', observeChildren);
        observeChildren();
        // Re-render button styling when href path changes
        // window.addEventListener('popstate', () => {
        //     console.log('Popstate event detected, updating MoreNav');
        //     this.requestUpdate();
        // });
        // window.addEventListener('pushstate', () => {
        //     console.log('Pushstate event detected, updating MoreNav');
        //     this.requestUpdate();
        // });
        // window.addEventListener('replacestate', () => {
        //     console.log('Replacestate event detected, updating MoreNav');
        //     this.requestUpdate();
        // });
        // window.addEventListener('hashchange', () => {
        //     console.log('Hashchange event detected, updating MoreNav');
        //     this.requestUpdate();
        // });
    }

    updated(changedProperties) {
        console.log('MoreNav updated', { changedProperties });
    }

    // shouldUpdate(changedProperties) {
    //     console.log('MoreNav shouldUpdate', { changedProperties });
    // }

    _positionPopover() {
        const button = this.shadowRoot.querySelector('button[popovertarget="children-nav"]');
        const popover = this.shadowRoot.getElementById('children-nav');
        if (!button || !popover) return;
        const rect = button.getBoundingClientRect();
        // Align popover's right edge to button's right edge
        const top = rect.bottom + window.scrollY;
        const right = window.innerWidth - (rect.right + window.scrollX);
        popover.style.position = 'absolute';
        popover.style.top = `${top}px`;
        popover.style.right = `${right}px`;
        popover.style.left = 'auto';
        popover.style.bottom = 'auto';
        popover.style.minWidth = `${rect.width}px`;
    }

    _toggleOpen() {
        this.isOpen = !this.isOpen;
        this.requestUpdate();
        if (this.isOpen) {
            this.updateComplete.then(() => this._positionPopover());
        }
    }

    get _hasActiveChild() {
        // Check if any slotted child-nav element has the 'active' attribute
        const slot = this.shadowRoot.querySelector('slot[name="child-nav"]');
        console.log('Checking for active child nav items:', { slot });
        if (!slot) return false;
        const nodes = slot.assignedElements ? slot.assignedElements() : [];
        console.log(slot.assignedElements);
        console.log('Checking for active child nav items:', nodes);
        return nodes.some((el) => el.hasAttribute('active'));
    }
    // <slot name="child-nav" @click="${() => this.updateComplete.then(() => {console.log('what'); return this.requestUpdate()})}"></slot>

    render() {
        const buttonClass = [
            "flex h-16 items-center justify-center gap-2 break-keep -mx-4 px-4 hover:cursor-pointer",
            this._hasActiveChild
                ? "text-(--dds-color-common-brand-default) font-(--dds-font-weight-bold) border-b-4 pt-1 hover:text-(--dds-color-common-brand-hover) focus:text-(--dds-color-common-brand-press) focus:outline-none active:bg-(--dds-color-common-surface-press)"
                : "text-(--dds-color-common-neutral-default) hover:text-(--dds-color-common-neutral-hover) focus:text-(--dds-color-common-neutral-press)"
        ].join(' ');

        return html`
            <button
                class=${buttonClass}
                popovertarget="children-nav"
                @click="${this._toggleOpen}"
            >
                ${this.parentNav}
                <daikin-icon
                    color="current"
                    icon="chevron-down"
                    size="xl"
                ></daikin-icon>
            </button>
            <div
                id="children-nav"
                popover
                class="rounded-md border border-solid border-[var(--dds-color-divider)]"
            >
                <daikin-card>
                    <div class="-mx-4">
                        <daikin-list>
                            <slot name="child-nav" @click="${() => this.updateComplete.then(() => {console.log(this._hasActiveChild); return this.requestUpdate()})}"></slot>
                        </daikin-list>
                    </div>
                </daikin-card>
            </div>
        `;
    }
}

customElements.define('more-nav', MoreNav);
