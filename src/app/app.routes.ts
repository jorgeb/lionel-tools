﻿import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule' },
  { path: 'ambrosebauer', loadChildren: './+ambrosebauer#AmbrosebauerModule' },
  { path: 'lionelpw', loadChildren: './+lionelpw#LionelPWModule' },
  { path: 'favorites', loadChildren: './+favorites#FavoritesModule' },
  { path: 'dashboard', loadChildren: './+dashboard#DashboardModule' },
  { path: 'tandem', loadChildren: './+tandem#TandemModule' },
  { path: '**',    component: NoContentComponent },
];
