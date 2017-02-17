import {
    Component,
    ViewEncapsulation,
    OnInit
} from '@angular/core';

import { arrayUtil } from '../@utils';

import { FavoriteService } from './favorite.service';
import { IFavoriteOptions } from './favorite-options.interface';


@Component({
    selector: 'favorites-viewer',
    template: require('./favorites-viewer.html'),
    styleUrls: ['./favorites-viewer.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FavoritesViewerComponent implements OnInit {

    public favorites: Array<IFavoriteOptions> = [];
    
    constructor(private favoriteService: FavoriteService) {}


    ngOnInit() {
        this.favorites = arrayUtil.arrayToTable(this.favoriteService.getAll(), 6);

        this.favoriteService.updateInFavorites.subscribe(option => {
            console.log(option)
            this.favorites = arrayUtil.arrayToTable(this.favoriteService.getAll(), 6);
        });
    }
}