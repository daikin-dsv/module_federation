import { LitElement, html, css, unsafeCSS } from 'lit';
import '../webcomponents';
import tailwindStyles from '../index.css?inline';
import { lightText } from '../text.json';

export class LightWidget extends LitElement {
    static properties = {
        label: { type: String },
        text: { type: Object }
    };

    constructor() {
        super();
        this.label = '';
        this.text = lightText;
        this.state = 'on';
        this.showToggle = false;
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    _toggle() {
        this.showToggle = !this.showToggle;
    }

    _setState(state) {
        this.state = state;
        this.showToggle = false;
    }

    render() {
        const COLORS = {
            yellow: 'text-[#ffc936]',
            gray: 'text-[#a0a0a0]'
        };

        return html`
            <daikin-card
                outline
                class="relative max-h-[274px] cursor-pointer"
                @click="${this._toggle}"
            >
                <div class="flex h-[240px] w-[240px] flex-col items-center justify-center">
                    <div class="mb-2 flex h-40 w-auto items-center ${COLORS[this.state === 'on' ? 'yellow' : 'gray']}">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-36"
                        >
                            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                            <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                        </svg>
                        ${this.showToggle
                            ? html`<div class="bg-opacity-50 absolute inset-0 flex h-full w-full grow flex-col items-center justify-center rounded-lg border border-gray-300 bg-white text-black opacity-100 transition-opacity duration-300">
                                  <div
                                      class="flex w-full flex-1 items-center justify-center border-b border-gray-300 text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
                                      @click="${(e) => {
                                          e.stopPropagation();
                                          this._setState('on');
                                      }}"
                                  >
                                      ${this.text.on}
                                  </div>
                                  <div
                                      class="flex w-full flex-1 items-center justify-center text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
                                      @click="${(e) => {
                                          e.stopPropagation();
                                          this._setState('off');
                                      }}"
                                  >
                                      ${this.text.off}
                                  </div>
                              </div>`
                            : null}
                    </div>
                    <div class="flex flex-col items-center text-gray-700">
                        <div class="font-bold">
                            ${this.state === 'on' ? this.text.on : this.text.off}
                        </div>
                        <div>${this.label}</div>
                    </div>
                </div>
            </daikin-card>
        `;
    }
}

customElements.define('light-widget', LightWidget);
