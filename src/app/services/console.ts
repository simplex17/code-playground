import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class Console {
    logs = signal(<{ type: string; message: string }[]>[]);

    addLog(type: string, messages: any[]) {
        const current = this.logs();

        const formatted = messages
            .map((message) =>
                typeof message === 'object'
                    ? JSON.stringify(message)
                    : String(message),
            )
            .join(' ');

        this.logs.set([...current, { type, message: formatted }]);
    }

    clearLogs() {
        this.logs.set([]);
    }
}
