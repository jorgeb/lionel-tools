import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './ambrosebauer.routes';
import { AmbrosebauerComponent } from './ambrosebauer.component';

import { AuctionsModule } from '../@auctions';

import { PagerModule } from '../@pager';
import { FavoriteModule, FavoritesViewerModule } from '../@favorites';
import { CardModule } from '../@card';
import { SpinnerModule } from '../@spinner';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        AmbrosebauerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        AuctionsModule,
        HttpModule,
        PagerModule,
        FavoriteModule,
        FavoritesViewerModule,
        CardModule,
        SpinnerModule
    ],
})
export class AmbrosebauerModule {
    public static routes = routes;
}