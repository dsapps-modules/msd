export type Locale = (typeof locales)[number];

const invariant = require('tiny-invariant');

invariant(
    process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
    'NEXT_PUBLIC_DEFAULT_LANGUAGE is required, but not set, check your .env file'
);
invariant(
    process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES,
    'NEXT_PUBLIC_AVAILABLE_LANGUAGES is required, but not set, check your .env file'
);

const isMultilangEnable =
    process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
    !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

function generateLocales() {
    if (isMultilangEnable) {
        return process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES?.split(',');
    }

    return [process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE];
}

export const locales = generateLocales as any;
export const defaultLocale: Locale = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE as any;

export const stripeValue: any = process.env.STRIPE_SECRET_KEY as any;
