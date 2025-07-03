import { LitElement, html, css, unsafeCSS } from 'lit';

import { authStore } from '../context/Auth/context.js';
import { logout, accountManagement } from '../context/Auth/keycloak.js';
import tailwindStyles from '../index.css?inline';
import { userText } from '../text.json';
import '../webcomponents';

export class UserProfile extends LitElement {
    static properties = {
        menu: { type: String },
        user: { type: Object },
        text: { type: Object },
        settings: { type: Object },
        language: { type: Object }
    };

    constructor() {
        super();
        this.menu = '';
        this.user = null;
        this.text = userText;
        this.settings = { language: false };
        this.language = {
            current: '',
            options: []
        };

        authStore.addEventListener('auth-changed', (e) => {
            this.user = e.detail;
            this.requestUpdate();
        });
    }


    _changeLanguage(e) {
        this.language = {
            ...this.language,
            current: e.target.value
        };
        // Dispatch a custom event to notify the host app of the language change
        this.dispatchEvent(new CustomEvent('user-profile-language-changed', {
            detail: { language: this.language.current },
            bubbles: true,
            composed: true
        }));
        this.requestUpdate();
    }

    static styles = css`
        ${unsafeCSS(tailwindStyles)}
    `;

    _showMenu(menu) {
        this.menu = menu;
    }

    render() {
        if (!this.user) {
            return html``;
        }

        return html`
            <div>
                <button popovertarget="popover-panel">
                    <daikin-icon-button
                        color="neutral"
                        variant="ghost"
                        @click="${() => this._showMenu('main')}"
                        data-testId="user-profile-button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="size-6"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </daikin-icon-button>
                </button>

                <div
                    id="popover-panel"
                    popover
                    class="absolute top-[48px] right-[20px] bottom-auto left-auto rounded-md border border-solid border-[var(--dds-color-divider)]"
                >
                    ${this.menu === 'main'
                        ? html`
                              <daikin-card class="flex w-80 flex-col" data-testId="user-profile-main-menu">
                                  <div class="flex flex-col">
                                      <span data-testId="user-profile-signed-in">${this.text.signedIn}</span>
                                      <span
                                          class="flex flex-wrap font-(--dds-font-weight-bold) break-all"
                                          data-testId="user-profile-username"
                                      >
                                        ${this.user.preferred_username}
                                      </span>
                                  </div>
                                  <div
                                      class="-mx-4 border-y-1 border-(--dds-color-divider) py-2"
                                  >
                                      <daikin-list>
                                          <daikin-list-item
                                              @click="${() => this._showMenu('profile')}"
                                              data-testId="user-profile-item"
                                          >
                                              ${this.text.profile}
                                              <daikin-icon
                                                  icon="chevron-right"
                                                  slot="right-icon"
                                              ></daikin-icon>
                                          </daikin-list-item>
                                    ${this.settings.language
                                        ? html`
                                            <daikin-list-item
                                                @click="${() => this._showMenu('settings')}"
                                                data-testId="user-settings-item"
                                            >
                                                ${this.text.settings}
                                                <daikin-icon
                                                    icon="chevron-right"
                                                    slot="right-icon"
                                                ></daikin-icon>
                                            </daikin-list-item>
                                        `
                                        : null}
                                      </daikin-list>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${logout}"
                                          variant="outline"
                                          data-testId="user-sign-out-button"
                                      >
                                          ${this.text.signOut}
                                      </daikin-button>
                                  </daikin-card-footer>
                              </daikin-card>
                          `
                        : null}
                    ${this.menu === 'profile'
                        ? html`
                              <daikin-card class="flex w-80 flex-col" data-testId="user-profile-profile-menu">
                                  <daikin-icon-button
                                      color="neutral"
                                      variant="ghost"
                                      @click="${() => this._showMenu('main')}"
                                      data-testId="user-profile-back-button"
                                  >
                                      <daikin-icon icon="chevron-left"></daikin-icon>
                                  </daikin-icon-button>
                                  <div class="flex flex-col gap-2">
                                      <div class="flex flex-col">
                                          <span class="font-(--dds-font-weight-bold)" data-testId="user-profile-name-label"
                                              >${this.text.name}</span
                                          >
                                          <span class="flex flex-wrap break-all" data-testId="user-profile-name"
                                              >${this.user.given_name}
                                              ${this.user.family_name}</span
                                          >
                                      </div>
                                      <div class="flex flex-col">
                                          <span class="font-(--dds-font-weight-bold)" data-testId="user-profile-email-label"
                                              >${this.text.email}</span
                                          >
                                          <span class="flex flex-wrap break-all" data-testId="user-profile-email"
                                              >${this.user.email}</span
                                          >
                                      </div>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${accountManagement}"
                                          variant="outline"
                                          data-testId="user-manage-account-button"
                                      >
                                          ${this.text.manageAccount}
                                          <daikin-icon
                                              icon="arrow-top-right-on-square"
                                              slot="right-icon"
                                          ></daikin-icon>
                                      </daikin-button>
                                  </daikin-card-footer>
                              </daikin-card>
                          `
                        : null}
                    ${this.menu === 'settings' && this.settings.language
                        ? html`
                              <daikin-card class="flex w-80 flex-col" data-testId="user-profile-settings-menu">
                                  <daikin-icon-button
                                      color="neutral"
                                      variant="ghost"
                                      @click="${() => this._showMenu('main')}"
                                      data-testId="user-profile-back-button"
                                  >
                                      <daikin-icon icon="chevron-left"></daikin-icon>
                                  </daikin-icon-button>
                                  <div class="flex flex-col gap-2">
                                      <label class="font-(--dds-font-weight-bold)"
                                          for="language-select"
                                          data-testId="user-profile-settings-language-label"
                                      >
                                        ${this.text.language}
                                      </label>
                                      <div class="relative">
                                          <select
                                              id="language-select"
                                              class="border rounded p-3 text-(--dds-color-common-text-primary) appearance-none w-full pr-10"
                                              @change="${this._changeLanguage}"
                                              .value="${this.language.current}"
                                              data-testId="user-language-select"
                                          >
                                              ${this.language.options.map(
                                                  (opt) => {
                                                    if (opt.value === this.language.current) {
                                                        return html`<option value="${opt.value}" selected data-testid="user-language-option-selected-${opt.value}">${opt.label}</option>`
                                                    } else {
                                                        return html`<option value="${opt.value}" data-testid="user-language-option-${opt.value}">${opt.label}</option>`
                                                    }
                                                }
                                              )}
                                          </select>
                                          <span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                                            <daikin-icon-button variant="ghost" color="neutral">
                                                <daikin-icon size="l" color="current" icon="chevron-down"></daikin-icon>
                                            </daikin-icon-button>
                                          </span>
                                      </div>
                                  </div>
                              </daikin-card>
                          `
                        : null}
                </div>
            </div>
        `;
    }
}

customElements.define('user-profile', UserProfile);
