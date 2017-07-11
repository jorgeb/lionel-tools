import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './dashboard.routes';
import { CloudinaryModule } from '../@cloudinary';
import { LionelAutocompleteModule } from '../@lionel-autocomplete';
import { DashboardComponent } from './dashboard.component';
@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CloudinaryModule,
        LionelAutocompleteModule
    ],
})
export class DashboardModule {
    public static routes = routes;
}
