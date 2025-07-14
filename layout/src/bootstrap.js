import { render, html } from 'lit';

import './components/Footer.js';
import './components/Header.js';
import './components/MoreNav.js';
import './components/User.js';
import './context/Auth/index.js';
import './index.css';

const root = document.getElementById('root');
root.replaceChildren();

render(
    html`
        <auth-provider>
            <app-header>
                <user-profile></user-profile>
                <a slot="route" href="/home" active>Home</a>
                <a slot="route" href="/about">About</a>
                <a slot="route" href="/contact">Contact</a>
                <more-nav slot="route" parentNav="Settings">
                    <a slot="child-nav" href="/alerts">Alerts</a>
                    <a slot="child-nav" href="/reports">Reports</a>
                </more-nav>
            </app-header>
            <app-footer></app-footer>
        </auth-provider>
    `,
    root
);

// Automatically toggle `active` on route links based on current path
function updateActiveLinks() {
    const links = root.querySelectorAll('a[slot="route"], a[slot="child-nav"]');
    const current = window.location.pathname;
    links.forEach((link) => {
        if (link.getAttribute('href') === current) {
            link.setAttribute('active', '');
        } else {
            link.removeAttribute('active');
        }
    });
}

// Initial run
updateActiveLinks();
// Update on history navigation
window.addEventListener('popstate', updateActiveLinks);
