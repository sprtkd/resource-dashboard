import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from './common/error/error.component';
import { LoginComponent } from './landing/login/login.component';
import { RegisterComponent } from './landing/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewLogsComponent } from './view-logs/view-logs.component';
const routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', children: [
            { path: '', component: LandingComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    },
    {
        path: 'app', children: [
            { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'logs', component: ViewLogsComponent }
        ]
    },
    { path: '**', component: ErrorComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map