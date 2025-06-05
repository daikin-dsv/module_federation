import { LitElement, html } from 'lit';

import { authStore } from './context.js';
import { init } from './keycloak.js';

export class AuthProvider extends LitElement {
    static properties = {
        isAuthenticated: { type: Boolean },
        user: { type: Object }
    };

    constructor() {
        super();
        this.isAuthenticated = false;
        this.user = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._initialize();
    }

    async _initialize() {
        const sso = await init();
        this.isAuthenticated = sso.authenticated;
        this.user = sso.tokenParsed;
        authStore.dispatchEvent(new CustomEvent('auth-changed', { detail: this.user }));
        this.requestUpdate();
    }

    render() {
        return this.isAuthenticated ? html`<slot></slot>` : html`Loading...`;
    }
}

customElements.define('auth-provider', AuthProvider);
