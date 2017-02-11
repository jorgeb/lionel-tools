import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardModule } from '../@card';

import { FavoriteService } from './favorite.service'
import { FavoritesViewerComponent } from './favorites-viewer.component';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        FavoritesViewerComponent
    ],
    exports: [
        FavoritesViewerComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        CardModule
    ],
    providers: [
        FavoriteService
    ]
})
export class FavoritesViewerModule {
}
