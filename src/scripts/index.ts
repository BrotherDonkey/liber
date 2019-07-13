import * as hljs from 'highlight.js';
import { bootstrapNavigation } from "./navigation";

bootstrapNavigation();
bootstrapThemes();
hljs.initHighlightingOnLoad();


export type themes = 'fox' | 'lightning' | 'comet' | 'bluebird';

export function bootstrapThemes() {
    let defaultTheme = localStorage.getItem('liber-default-theme');
    if (!defaultTheme) {
        localStorage.setItem('liber-default-theme', 'fox');
        defaultTheme = 'fox';
    }

    document.documentElement.classList.add(`theme-${defaultTheme}`);
}