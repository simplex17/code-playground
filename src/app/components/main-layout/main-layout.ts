import { Component, computed, inject } from '@angular/core';
import { EditorPanel } from '../editor-panel/editor-panel';
import { PreviewPanel } from '../preview-panel/preview-panel';
import { AngularSplitModule } from 'angular-split';
import { Layout } from '../../services/layout';

@Component({
    selector: 'app-main-layout',
    imports: [EditorPanel, PreviewPanel, AngularSplitModule],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.css',
})
export class MainLayout {
    layoutService = inject(Layout);
    
    direction = computed(() =>
        this.layoutService.isDesktop() ? 'horizontal' : 'vertical',
    );
}
