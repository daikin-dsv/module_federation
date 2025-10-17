import { LitElement, html, css, unsafeCSS } from 'lit';

import { getCurrentUser, onAuthChange } from '../context/Auth/index.js';
import { logout, accountManagement } from '../context/Auth/keycloak.js';
import tailwindStyles from '../index.css?inline';
import text from '../text.json';
import '../webcomponents.js';

/**
 * @typedef {Object} UserText
 * @property {string} email
 * @property {string} english
 * @property {string} japanese
 * @property {string} language
 * @property {string} manageAccount
 * @property {string} name
 * @property {string} profile
 * @property {string} settings
 * @property {string} signedIn
 * @property {string} signOut
 */

export class UserProfile extends LitElement {
    static properties = {
        menu: { type: String },
        user: { type: Object },
        text: { type: Object },
        logoutLink: { type: String },
        accountManagementLink: { type: String }
        // Enable settings when needed
        // settings: { type: Object },
    };

    constructor() {
        super();
        this.menu = '';
        this.user = null;
        /** @type {UserText} */
        this.text = text.userText;
        this.logoutLink = null;
        this.accountManagementLink = null;
        // this.settings = false;
    }

    connectedCallback() {
        super.connectedCallback();

        // Only fetch user from context if not passed as a prop
        if (!this.user) {
            const user = getCurrentUser();
            if (user) {
                this.user = user;
            }
            onAuthChange((e) => {
                this.user = e.detail;
                this.requestUpdate();
            });
        }
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
                    class="absolute top-[48px] right-[20px] bottom-auto left-auto overflow-auto overflow-x-hidden rounded-md border border-solid border-[var(--dds-color-divider)]"
                >
                    ${this.menu === 'main'
                        ? html`
                              <daikin-card
                                  class="flex w-80 flex-col"
                                  data-testId="user-profile-main-menu"
                              >
                                  <div class="flex flex-col">
                                      <span data-testId="user-profile-signed-in"
                                          >${this.text.signedIn}</span
                                      >
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
                                          ${
                                              /* this.settings
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
                                        : null */ ''
                                          }
                                      </daikin-list>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${this.logoutLink
                                              ? () =>
                                                    (window.location.href =
                                                        this.logoutLink)
                                              : logout}"
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
                              <daikin-card
                                  class="flex w-80 flex-col"
                                  data-testId="user-profile-profile-menu"
                              >
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
                                          <span
                                              class="font-(--dds-font-weight-bold)"
                                              data-testId="user-profile-name-label"
                                              >${this.text.name}</span
                                          >
                                          <span
                                              class="flex flex-wrap break-all"
                                              data-testId="user-profile-name"
                                              >${this.user.given_name}
                                              ${this.user.family_name}</span
                                          >
                                      </div>
                                      <div class="flex flex-col">
                                          <span
                                              class="font-(--dds-font-weight-bold)"
                                              data-testId="user-profile-email-label"
                                              >${this.text.email}</span
                                          >
                                          <span
                                              class="flex flex-wrap break-all"
                                              data-testId="user-profile-email"
                                              >${this.user.email}</span
                                          >
                                      </div>
                                      <div class="flex flex-col">
                                          <span
                                              class="font-(--dds-font-weight-bold)"
                                              data-testId="user-profile-language-label"
                                              >${this.text.language}</span
                                          >
                                          <span
                                              class="flex flex-wrap break-all"
                                              data-testId="user-profile-language"
                                              >${this.user.locale === 'en' &&
                                              this.text.english
                                                  ? this.text.english
                                                  : this.user.locale === 'ja' &&
                                                      this.text.japanese
                                                    ? this.text.japanese
                                                    : this.user.locale}</span
                                          >
                                      </div>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${this.accountManagementLink
                                              ? () =>
                                                    window.open(
                                                        this.accountManagementLink,
                                                        '_blank'
                                                    )
                                              : accountManagement}"
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
                    ${
                        /* this.menu === 'settings'
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
                                  </div>
                              </daikin-card>
                          `
                        : null */ ''
                    }
                </div>
            </div>
        `;
    }
}

if (!customElements.get('user-profile')) {
    customElements.define('user-profile', UserProfile);
}
