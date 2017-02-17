import {
  Component,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

import { FavoriteService } from './favorite.service';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
    moduleId: module.id.toString(),
  selector: 'favorite',
  template: require('./favorite.html'),
})
export class FavoriteComponent implements OnChanges, OnInit{

    public added: boolean = false;

    @Input()
    public options: any;

    @Input()
    public key: string;

    @Output()
    public addToFavorite: EventEmitter<any> = new EventEmitter();

    constructor(private favoriteService: FavoriteService) {
    }

    public ngOnInit() {
        this.favoriteService.updateInFavorites.subscribe(option => {

            if (this.options.key === option.favorite.key) {
                this.added = !this.added;

                this.addToFavorite.emit(this.options);

            }
        });

    }

    public onClick() {

        if (this.added) {
            this.favoriteService.remove(this.key);
        } else {
            this.favoriteService.add(this.key, this.options);
        }
    }

    ngOnChanges() {
        this.added = !(this.favoriteService.get(this.key) == null);
    }
}