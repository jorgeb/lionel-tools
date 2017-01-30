import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FavoriteComponent } from './favorite.component';
import { FavoriteService } from './favorite.service'

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        FavoriteComponent
    ],
    exports: [FavoriteComponent],
    imports: [
        CommonModule],
    providers: [
        FavoriteService
    ]
})
export class FavoriteModule {
}
