'use client';

import * as React from 'react';

import { DaikinBreadcrumbItem } from '@daikin-oss/design-system-web-components/components/breadcrumb-item/index.js';
import { DaikinBreadcrumb } from '@daikin-oss/design-system-web-components/components/breadcrumb/index.js';
import { DaikinButton } from '@daikin-oss/design-system-web-components/components/button/index.js';
import { DaikinLoading } from '@daikin-oss/design-system-web-components/components/loading/index.js';
import { createComponent } from '@lit/react';

export const DaikinBreadcrumbReact = createComponent({
    tagName: 'daikin-breadcrumb',
    elementClass: DaikinBreadcrumb,
    react: React
});

export const DaikinBreadcrumbItemReact = createComponent({
    tagName: 'daikin-breadcrumb-item',
    elementClass: DaikinBreadcrumbItem,
    react: React
});

export const DaikinButtonReact = createComponent({
    tagName: 'daikin-button',
    elementClass: DaikinButton,
    react: React
});

export const DaikinLoadingReact = createComponent({
    tagName: 'daikin-loading',
    elementClass: DaikinLoading,
    react: React,
    events: {}
});
