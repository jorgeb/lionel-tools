import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './tandem.routes';
import { TandemComponent } from './tandem.component';
import { LiveAuctionersModule } from '../@liveauctioners';
import { LionelModule } from '../@lionel';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        TandemComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        LionelModule,
        LiveAuctionersModule,
        HttpModule
    ],
    providers: [
    ]
})
export class TandemModule {
    public static routes = routes;
}