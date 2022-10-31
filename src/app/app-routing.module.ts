import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { DefaultsComponent } from './defaults/defaults.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
	{ path: '', redirectTo: 'navigation', pathMatch: 'full' },
	{ path: 'defaults', component: DefaultsComponent },
	{ path: 'holidays', component: HolidaysComponent },
	{ path: 'navigation', component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
