import {
  Component,
  OnInit,
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
export class FavoriteComponent {

    @Input()
    public options: any;

    @Output()
    public addToFavorite: EventEmitter<any> = new EventEmitter();

    constructor(private favoriteService: FavoriteService) {}

    public onClick() {
        console.log(this.options)
        this.favoriteService.add(this.options);
        this.addToFavorite.emit(this.options);
    }
}