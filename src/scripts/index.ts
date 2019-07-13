import * as hljs from 'highlight.js';
import { bootstrapNavigation } from "./navigation";

bootstrapNavigation();
bootstrapThemes();
hljs.initHighlightingOnLoad();


export type themes = 'fox' | 'lightning' | 'comet' | 'skull';

export function bootstrapThemes() {
    let defaultTheme = localStorage.getItem('liber-default-theme');
    if (!defaultTheme) {
        localStorage.setItem('liber-default-theme', 'fox');
        defaultTheme = 'fox';
    }

    document.documentElement.classList.add(`theme-${defaultTheme}`);

    window.addEventListener('click', e => {
        const target = e.target instanceof Element && e.target.closest('[data-theme-control]') as HTMLElement;
        if (!target) {
            return;
        }
        const theme = target.dataset.themeControl as themes;
        if (theme) {
            localStorage.setItem('liber-default-theme', theme);
            removeAllThemeClass(document.documentElement);
            document.documentElement.classList.add(`theme-${theme}`);
        }
    })
}

export function removeAllThemeClass(element: HTMLElement) {
    element.classList.remove('theme-fox', 'theme-lightning', 'theme-skull', 'theme-comet', 'theme-ice-cream');
}