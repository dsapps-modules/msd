'use client'
import { useRouter } from 'next/router';
//import { useRouter } from 'next/navigation';
const localeRTLList = ['ar', 'he'];
export function useIsRTL() {
    const { locale } = useRouter();
    if (locale && localeRTLList.includes(locale)) {
        return { isRTL: true, alignLeft: 'right', alignRight: 'left' };
    }
    return { isRTL: false, alignLeft: 'left', alignRight: 'right' };
}

export let languageMenu = [
    {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: 'https://ipgeolocation.io/static/flags/us_64.png',
    },
    {
        id: 'ar',
        name: 'عربى',
        value: 'ar',
        icon: 'https://ipgeolocation.io/static/flags/sa_64.png',
    }

];
