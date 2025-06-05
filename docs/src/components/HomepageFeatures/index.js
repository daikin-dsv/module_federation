import React from 'react';

import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Widgets',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: <>Various widgets available out of the box.</>
    },
    {
        title: 'Layouts',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: <>Configurable headers, footers and navigations.</>
    },
    {
        title: 'Templates',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: <>Get a head start with prebuilt templates.</>
    },
    {
        title: 'Daikin Design System',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>Utilizes the Daikin Design System for consistent and cohesive styling.</>
        )
    },
    {
        title: 'Dosatsu SSO Authentication',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: <>Log in to multiple applications with Dosatsu Single Sign-On.</>
    },
    {
        title: 'Dosatsu Data Lake',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                Store historical and timeseries data, create meta data and manage content
                authorization.
            </>
        )
    },
    {
        title: 'Dosatsu GraphQL',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: <>Request your data with GraphQL APIs.</>
    },
    {
        title: 'Databricks Data Warehouse',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>Already a Databricks user? Retrieve data with your existing logics.</>
        )
    },
    {
        title: 'Databricks BI Dashboard',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: <>Embed your Databricks dashboard straight into your application.</>
    },
    {
        title: 'Deployment',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: <>Deploy your application right away.</>
    },
    {
        title: 'Tests',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: <>Prebuilt with Playwright Test to test your custom code.</>
    }
];

function Feature({ Svg, title, description }) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
