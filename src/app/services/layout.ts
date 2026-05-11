import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Layout {
    private breakpointObserver = inject(BreakpointObserver);
    
    isDesktop: Signal<boolean>;

    constructor() {
        this.isDesktop = toSignal(
            this.breakpointObserver
                .observe(['(min-width: 900px)'])
                .pipe(map((res) => res.matches)),
            { initialValue: true },
        );
    }
}
