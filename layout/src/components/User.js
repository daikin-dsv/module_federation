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
        text: { type: Object }
    };

    constructor() {
        super();
        this.menu = '';
        this.user = null;
        this.text = userText;

        authStore.addEventListener('auth-changed', (e) => {
            this.user = e.detail;
            this.requestUpdate();
        });
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
                <button popovertarget="popover-panel" data-testid="user-profile-button">
                    <daikin-icon-button
                        color="neutral"
                        variant="ghost"
                        @click="${() => this._showMenu('main')}"
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
                    class="absolute top-[48px] right-[20px] bottom-auto left-auto rounded-b-md border border-solid border-[var(--dds-color-divider)]"
                >
                    ${this.menu === 'main'
                        ? html`
                              <daikin-card class="flex w-80 flex-col">
                                  <div class="flex flex-col">
                                      <span>${this.text.signedIn}</span>
                                      <span
                                          class="flex flex-wrap font-(--dds-font-weight-bold) break-all"
                                          >${this.user.preferred_username}</span
                                      >
                                  </div>
                                  <div
                                      class="-mx-4 border-y-1 border-(--dds-color-divider) py-2"
                                  >
                                      <daikin-list>
                                          <daikin-list-item
                                              @click="${() => this._showMenu('profile')}"
                                          >
                                              ${this.text.profile}
                                              <daikin-icon
                                                  icon="chevron-right"
                                                  slot="right-icon"
                                              ></daikin-icon>
                                          </daikin-list-item>
                                      </daikin-list>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${logout}"
                                          variant="outline"
                                      >
                                          ${this.text.signOut}
                                      </daikin-button>
                                  </daikin-card-footer>
                              </daikin-card>
                          `
                        : null}
                    ${this.menu === 'profile'
                        ? html`
                              <daikin-card class="flex w-80 flex-col">
                                  <daikin-icon-button
                                      color="neutral"
                                      variant="ghost"
                                      @click="${() => this._showMenu('main')}"
                                  >
                                      <daikin-icon icon="chevron-left"></daikin-icon>
                                  </daikin-icon-button>
                                  <div class="flex flex-col gap-2">
                                      <div class="flex flex-col">
                                          <span class="font-(--dds-font-weight-bold)"
                                              >${this.text.name}</span
                                          >
                                          <span class="flex flex-wrap break-all"
                                              >${this.user.given_name}
                                              ${this.user.family_name}</span
                                          >
                                      </div>
                                      <div class="flex flex-col">
                                          <span class="font-(--dds-font-weight-bold)"
                                              >${this.text.email}</span
                                          >
                                          <span class="flex flex-wrap break-all"
                                              >${this.user.email}</span
                                          >
                                      </div>
                                  </div>
                                  <daikin-card-footer>
                                      <daikin-button
                                          class="w-full"
                                          @click="${accountManagement}"
                                          variant="outline"
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
                </div>
            </div>
        `;
    }
}

customElements.define('user-profile', UserProfile);
