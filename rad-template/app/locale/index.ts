import type { SupportedLocale, TextBundle } from './types';

type Loader = () => Promise<{ default: TextBundle }>;

type LocaleLoaders = Record<SupportedLocale, Loader>;

const LOADERS: LocaleLoaders = {
    en: () => import('./en'),
    ja: () => import('./ja')
};

const DEFAULT_LOCALE: SupportedLocale = 'en';

function normalizeLocale(locale?: string): SupportedLocale {
    if (!locale) {
        return DEFAULT_LOCALE;
    }

    const [languageCode] = locale.toLowerCase().split('-');

    if (languageCode === 'ja') {
        return 'ja';
    }

    return DEFAULT_LOCALE;
}

export async function loadTexts(locale?: string): Promise<TextBundle> {
    const normalizedLocale = normalizeLocale(locale);
    const loader = LOADERS[normalizedLocale] ?? LOADERS[DEFAULT_LOCALE];
    const textModule = await loader();

    return textModule.default;
}

export type { TextBundle };
