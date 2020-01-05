import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', 
      canLoad: [ AuthGuardService ],
      loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule )
    },
    { path: '**', redirectTo: '' },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
 })

export class AppRoutingModule {

}
