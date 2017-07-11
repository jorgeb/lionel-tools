import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './favorites.routes';
import { FavoritesComponent } from './favorites.component';

import { CardModule } from '../@card';
import { CloudinaryModule } from '../@cloudinary';
@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        HttpModule,
        CardModule,
        CloudinaryModule
    ],
})
export class FavoritesModule {
    public static routes = routes;
}