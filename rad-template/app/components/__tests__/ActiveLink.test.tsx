import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import ActiveLink from '../ActiveLink';

describe('ActiveLink Component', () => {
    // Clean up after each test to avoid DOM conflicts
    afterEach(() => {
        cleanup();
    });

    it('marks the link as active when the current pathname matches the href', () => {
        render(<ActiveLink href="/page2">Page 2</ActiveLink>);

        const link = screen.getByRole('link', { name: 'Page 2' });
        expect(link.getAttribute('href')).toBe('/page2');
    });

    it('does not add the active attribute when the pathname differs', () => {
        render(<ActiveLink href="/page2">Page 2</ActiveLink>);

        const link = screen.getByRole('link', { name: 'Page 2' });
        expect(link).not.toHaveAttribute('active');
        expect(link).toHaveAttribute('href', '/page2');
    });

    it('forwards additional anchor props', () => {
        render(
            <ActiveLink href="/page2" className="nav-link">
                Page 2
            </ActiveLink>
        );

        const link = screen.getByRole('link', { name: 'Page 2' });
        expect(link).toHaveClass('nav-link');
    });
});
