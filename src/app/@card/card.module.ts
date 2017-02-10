import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { FavoriteModule } from '../@favorites/favorite.module';

@NgModule({
    declarations: [
        // Components / Directives/ Pipes
        CardComponent
    ],
    exports: [CardComponent],
    imports: [
        CommonModule,
        FavoriteModule],
    providers: []
})
export class CardModule {
}
