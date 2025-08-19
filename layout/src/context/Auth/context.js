// Framework-agnostic auth store + helpers
// Keeps an in-memory snapshot and emits "auth-changed" events via EventTarget

export const authStore = new EventTarget();

// ---- Snapshot state ----
let _user = null; // Decoded user profile (or null)
let _isAuthenticated = false; // Boolean auth status

// ---- Event helpers ----
export function onAuthChange(handler) {
    authStore.addEventListener('auth-changed', handler);
}

export function offAuthChange(handler) {
    authStore.removeEventListener('auth-changed', handler);
}

// ---- Snapshot getters (safe for any framework) ----
export function getCurrentUser() {
    return _user;
}

export function isAuthenticated() {
    return _isAuthenticated;
}

// ---- Internal setter (call this from your AuthProvider after SSO init/refresh) ----
export function setAuthSnapshot({ user, isAuthenticated }) {
    _user = user ?? null;
    _isAuthenticated = !!isAuthenticated;
    // Notify all consumers (Lit, React, vanilla)
    authStore.dispatchEvent(new CustomEvent('auth-changed', { detail: _user }));
}

// Optional: expose a no-op clear for tests or logout flows
export function clearAuthSnapshot() {
    _user = null;
    _isAuthenticated = false;
    authStore.dispatchEvent(new CustomEvent('auth-changed', { detail: null }));
}
