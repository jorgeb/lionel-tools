import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { routes } from './lionelpw.routes';
import { LionelPWComponent } from './lionelpw.component';
import { LionelPWService } from './lionelpw.service';

import { LionelModule } from '../@lionel';
import { SpinnerModule } from '../@spinner';

import { AuthorizationModule } from '../@authorization';
@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        LionelPWComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        LionelModule,
        HttpModule,
        SpinnerModule,
        AuthorizationModule
    ],
    providers: [
        LionelPWService
    ]
})
export class LionelPWModule {
    public static routes = routes;
}