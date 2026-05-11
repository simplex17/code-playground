import {
    Component,
    computed,
    HostListener,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { Editor } from '../../services/editor';
import { DomSanitizer } from '@angular/platform-browser';
import { Console } from '../../services/console';
import { AngularSplitModule } from 'angular-split';
import { ConsolePanel } from '../console-panel/console-panel';

@Component({
    selector: 'app-preview-panel',
    imports: [AngularSplitModule, ConsolePanel],
    templateUrl: './preview-panel.html',
    styleUrl: './preview-panel.css',
    standalone: true,
})
export class PreviewPanel implements OnInit {
    editorService = inject(Editor);
    consoleService = inject(Console);
    sanitizer = inject(DomSanitizer);

    iFrameDoc: any = signal('');

    @HostListener('window:message', ['$event']) onMessage(event: MessageEvent) {
        if (event.data?.type) {
            this.consoleService.addLog(event.data.type, event.data.data);
        }
    }

    ngOnInit(): void {
        this.iFrameDoc = computed(() =>
            this.sanitizer.bypassSecurityTrustHtml(
                this.generateHTML(
                    this.editorService.html(),
                    this.editorService.css(),
                    this.editorService.js(),
                ),
            ),
        );
    }

    generateHTML(html: string, css: string, js: string): string {
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>
                <script type='module'>
                    const sendToParent = (type, data) => {
                        window.parent.postMessage({ type, data }, '*');
                    }

                    console.log = (...args) => {
                        sendToParent('log', args);
                    }

                    console.error = (...args) => {
                        sendToParent('error', args);
                    }

                    window.onerror = (message, source, lineno, colno, error) => {
                        sendToParent('error', [message]);
                    }

                    try {
                        ${js}
                    } catch(e) {
                        console.error(e.message)
                    }
                </script>
            <head>
            <body>
                ${html}
            </body>
        <html>
        `;
    }
}
