import { LitElement, html, css, unsafeCSS } from 'lit';
// Remove these if you plan to use native <a> tags
import debounce from 'lodash/debounce';

import Logo from '../assets/daikin_logo.png';
import tailwindStyles from '../index.css?inline';
import { headerText } from '../text.json';
import '../webcomponents';

export class HeaderComponent extends LitElement {
    // Reactive properties for the header component
    static properties = {
        text: { type: Object },
        showMore: { type: Boolean },
    };

    constructor() {
        super();
        this.text = headerText;
        this.showMore = false;
        // Cache widths of route elements because widths change when in overflow
        this.__cachedWidths = [];
    }

    // Active state is determined by the presence of an `active` attribute on slotted elements.
    // Users are responsible for setting this attribute according to their routing logic.
    static styles = css`
        ${unsafeCSS(tailwindStyles)}

        :host ::slotted([slot='route']) {
            display: flex !important;
            flex-shrink: 1 !important;
            min-width: 0 !important;
            height: 4rem !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 1rem !important;
            white-space: nowrap !important;
        }

        :host ::slotted([slot='route'][active]) {
            border-bottom: 4px solid var(--dds-color-common-brand-default) !important;
            padding-top: 0.25rem !important;
            font-weight: var(--dds-font-weight-bold) !important;
            color: var(--dds-color-common-brand-default) !important;
        }

        :host ::slotted([slot='route'][active]:hover) {
            border-bottom-color: var(--dds-color-common-brand-hover) !important;
            color: var(--dds-color-common-brand-hover) !important;
        }

        :host ::slotted([slot='route'][active]:focus) {
            border-bottom-color: var(--dds-color-common-brand-press) !important;
            color: var(--dds-color-common-brand-press) !important;
            outline: none !important;
        }

        :host ::slotted([slot='route']:not([active])) {
            color: var(--dds-color-common-neutral-default) !important;
        }

        :host ::slotted([slot='route']:not([active]):hover) {
            color: var(--dds-color-common-neutral-hover) !important;
        }

        :host ::slotted([slot='route']:not([active]):focus) {
            color: var(--dds-color-common-neutral-press) !important;
            outline: none !important;
        }

        /* Overflow-route slot common styling */
        :host ::slotted([slot='overflow-route']) {
            display: flex !important;
            height: 100% !important;
            width: 100% !important;
            align-items: center !important;
            padding: 0.75rem !important;
            white-space: nowrap !important;
            color: var(--dds-color-common-neutral-default) !important;
        }

        /* Active overflow item styling */
        :host ::slotted([slot='overflow-route'][active]) {
            font-weight: var(--dds-font-weight-bold) !important;
            color: var(--dds-color-common-brand-default) !important;
        }
        :host ::slotted([slot='overflow-route'][active]:hover) {
            background-color: var(--dds-color-common-surface-hover) !important;
            color: var(--dds-color-common-brand-hover) !important;
        }
        :host ::slotted([slot='overflow-route'][active]:focus) {
            color: var(--dds-color-common-brand-press) !important;
            outline: none !important;
        }
        :host ::slotted([slot='overflow-route'][active]:active) {
            background-color: var(--dds-color-common-surface-press) !important;
        }

        /* Inactive overflow item styling */
        :host ::slotted([slot='overflow-route']:not([active]):hover) {
            background-color: var(--dds-color-common-surface-hover) !important;
            color: var(--dds-color-common-neutral-hover) !important;
        }
        :host ::slotted([slot='overflow-route']:not([active]):focus) {
            color: var(--dds-color-common-neutral-press) !important;
            outline: none !important;
        }
        :host ::slotted([slot='overflow-route']:not([active]):active) {
            background-color: var(--dds-color-common-surface-press) !important;
        }
    `;

    firstUpdated() {
        super.firstUpdated?.();

        // Grab all “route” + “overflow-route” elements once and cache their widths
        const nodes = Array.from(
            this.querySelectorAll('[slot="route"], [slot="overflow-route"]')
        );

        const container = this.shadowRoot.querySelector('ul.nav-list');
        if (!container) return;

        // Helper to compute overflow index based on cached widths and a given container width
        const computeOverflow = (containerWidth) => {
            let total = this.shadowRoot.querySelector('nav-menu.more-nav')?.offsetWidth + 32 || 0; // 32px for margin
            let index = nodes.length;
            for (let i = 0; i < this.__cachedWidths.length; i++) {
                total += this.__cachedWidths[i];
                if (total > containerWidth) {
                    index = i;
                    break;
                }
            }

            return index;
        };

        // Measure overflow state
        const measure = () => {
            // Initial measurement
            // Widths will include 0 if elements have not been rendered yet
            if (this.__cachedWidths.length === 0 || this.__cachedWidths.includes(0)) {
                this.__cachedWidths = nodes.map((el) => el.getBoundingClientRect().width);
            }

            const width = container.getBoundingClientRect().width;
            const index = computeOverflow(width);
            nodes.forEach((el, i) => {
                if (i < index) {
                    el.setAttribute('slot', 'route');
                    el.hidden = false;
                } else {
                    el.setAttribute('slot', 'overflow-route');
                    el.hidden = false;
                }
            });

            this.showMore = index < nodes.length;

            this.requestUpdate();
        };
        measure();

        // Observe header for resize; recalculate using cached widths
        const resizeObserver = new ResizeObserver(debounce(measure, 20));
        resizeObserver.observe(this.shadowRoot.querySelector('header'));
    }

    render() {
        return html`
            <header
                class="font-daikinSerif flex h-16 w-full min-w-[360px] flex-row items-center justify-between border border-solid border-[var(--dds-color-divider)] pr-4 pl-3"
            >
                <div class="flex flex-grow items-center gap-5">
                    <slot name="logo">
                        <a href="/" class="flex h-16 items-center">
                            <img
                                src="${Logo}"
                                alt="Daikin"
                                class="h-8 min-w-[115.52px]"
                            />
                        </a>
                    </slot>

                    <nav class="flex flex-grow justify-start items-center">
                        <ul class="nav-list flex max-h-16 flex-grow flex-wrap overflow-hidden">
                            <slot name="route"></slot>
                            ${this.showMore
                                ? html`
                                    <nav-menu class="more-nav mx-4" parentNav="${this.text.more}">
                                        <slot name="overflow-route" slot="child-nav"></slot>
                                    </nav-menu>
                                    `
                                : ''
                            }
                        </ul>
                    </nav>
                </div>
                <div>
                    <slot></slot>
                </div>
            </header>
        `;
    }
}

customElements.define('app-header', HeaderComponent);
