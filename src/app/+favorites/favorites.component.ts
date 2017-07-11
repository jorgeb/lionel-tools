import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { FavoriteService, IFavoriteOptions } from '../@favorites';

import {
    Observable,
    Observer,
    Subscription
} from 'rxjs';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'favorites',
  template: require('./favorites.html'),
})
export class FavoritesComponent implements OnInit {
    
    public favoriteItemsFilter: Array<IFavoriteOptions> = [];
    public favorites: Array<IFavoriteOptions> = [];
    
  
    constructor(private http: Http, private favoriteService: FavoriteService) {

    }

    public ngOnInit() {

        this.favoriteItemsFilter =
            this.favoriteService.getAll().filter(f => {
            return f.key.indexOf('275') > 0;
            })
            .sort((a, b) => {
                return parseInt(a.key.replace('amb-275%26lot%3D', '')) - parseInt(b.key.replace('amb-275%26lot%3D', ''));
            });
        //amb-267%26lot%3D104
        console.log(this.favoriteItemsFilter)
    }

}
