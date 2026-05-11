import { Component, computed, inject } from '@angular/core';
import { Console } from '../../services/console';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-console-panel',
    imports: [CommonModule],
    templateUrl: './console-panel.html',
    styleUrl: './console-panel.css',
})
export class ConsolePanel {
    consoleService = inject(Console);
    
    logs = computed(() => this.consoleService.logs());
}
