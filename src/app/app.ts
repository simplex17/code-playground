import { Component } from '@angular/core';
import { MainLayout } from './components/main-layout/main-layout';

@Component({
    selector: 'app-root',
    imports: [MainLayout],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {}
