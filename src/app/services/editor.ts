import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Editor {
    html = signal('');
    css = signal('');
    js = signal('');

    setHTML(value: string) {
        this.html.set(value);
    }

    setCSS(value: string) {
        this.css.set(value);
    }

    setJS(value: string) {
        this.js.set(value);
    }
}
