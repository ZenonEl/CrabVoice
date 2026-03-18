import en from './locales/en.json';
import ru from './locales/ru.json';

export type Locale = 'en' | 'ru';

const locales: Record<Locale, Record<string, string>> = { en, ru };

let currentLocale: Locale = 'en';

/** Get translation by key, with optional interpolation: t('key', { count: 5 }) */
export function t(key: string, params?: Record<string, string | number>): string {
    let text = locales[currentLocale]?.[key] ?? locales['en']?.[key] ?? key;
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            text = text.replace(`{${k}}`, String(v));
        }
    }
    return text;
}

/** Get current locale */
export function getLocale(): Locale {
    return currentLocale;
}

/** Set locale and optionally apply to DOM */
export function setLocale(locale: Locale, applyDOM = true) {
    currentLocale = locale;
    if (applyDOM) applyToDOM();
}

/** Scan DOM for data-i18n and data-i18n-placeholder attributes and apply translations */
export function applyToDOM(root: ParentNode = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n')!;
        el.textContent = t(key);
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder')!;
        (el as HTMLInputElement).placeholder = t(key);
    });
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title')!;
        (el as HTMLElement).title = t(key);
    });
}
