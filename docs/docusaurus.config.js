// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Rapid Application Development Framework',
    tagline: 'RAD Docs',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-site.example.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    routeBasePath: '/' // Serve the docs at the site's root
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css'
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: '',
                logo: {
                    alt: 'Daikin Logo',
                    src: 'img/daikin_logo.png'
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'samplesSidebar',
                        position: 'left',
                        label: 'Samples'
                    },
                    {
                        type: 'docSidebar',
                        sidebarId: 'getStartedSidebar',
                        position: 'left',
                        label: 'Get Started'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'RAD Docs',
                        items: [
                            {
                                label: 'Home',
                                to: '/'
                            },
                            {
                                label: 'Samples',
                                to: '/samples/widgets'
                            },
                            {
                                label: 'Get Started',
                                to: '/get-started/full-package'
                            }
                        ]
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/daikin-dsv/module_federation'
                            }
                        ]
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Daikin Open Innovation Lab Silicon Valley`
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula
            }
        })
};

export default config;
