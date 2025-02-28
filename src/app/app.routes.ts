import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full', 
    },
    {
        path: 'login',
        loadComponent: () => LoginComponent,
        canActivate: [ LoginGuard ]
    },
    {
        path: 'home',
        loadComponent: () => HomeComponent,
        canActivate: [ AuthGuard ]
    }
];
