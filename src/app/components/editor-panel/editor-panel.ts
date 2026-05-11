import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Editor } from '../../services/editor';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { Console } from '../../services/console';

@Component({
    selector: 'app-editor-panel',
    imports: [FormsModule, CommonModule, MonacoEditorModule],
    templateUrl: './editor-panel.html',
    styleUrl: './editor-panel.css',
})
export class EditorPanel {
    editorService = inject(Editor);
    consoleService = inject(Console);
    
    activeTab = signal<string | 'html' | 'css' | 'js'>('html');
    htmlCode = signal('');
    cssCode = signal('');
    jsCode = signal('');

    OPTIONS = {
        automaticLayout: true,
        fontLigatures: true,
        fontSize: 24,
        stickyScroll: {
            enabled: false,
        },
        theme: 'vs-dark',
        wordWrap: 'on',
    };

    changeActiveTab(tabName: string) {
        this.activeTab.set(tabName);
    }

    runCode() {
        this.consoleService.clearLogs();
        this.editorService.setHTML(this.htmlCode());
        this.editorService.setCSS(this.cssCode());
        this.editorService.setJS(this.jsCode());
    }
}
