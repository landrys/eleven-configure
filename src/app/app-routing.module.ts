import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { DefaultsComponent } from './defaults/defaults.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'defaults', component: DefaultsComponent, canActivate: [AuthGuard] },
	{ path: 'holidays', component: HolidaysComponent, canActivate: [AuthGuard] },
	{ path: 'vendors', component: VendorsComponent, canActivate: [AuthGuard] },
	{ path: 'navigation', component: NavigationComponent, canActivate: [AuthGuard] },
	{ path: 'detail/:id', component: VendorDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
