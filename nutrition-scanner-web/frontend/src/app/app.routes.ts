import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ScanComponent } from './components/scan/scan.component';
import { AvoidListComponent } from './components/avoid-list/avoid-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'scan', component: ScanComponent },
    { path: 'avoid-list', component: AvoidListComponent },
];
