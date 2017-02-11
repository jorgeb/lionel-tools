import { Injectable } from '@angular/core';
import { IFavoriteOptions } from './favorite-options.interface';

@Injectable()
export class FavoriteService {

    private favoritesStorage: { [id: string]: any; };

    constructor() {
        this.favoritesStorage = JSON.parse(localStorage.getItem('favoritesStorage'));
    }

    add(key:string, options: any): void {

        if (this.favoritesStorage === null) {
            this.favoritesStorage = {};
        }

        this.favoritesStorage[key] = options;

        localStorage.setItem('favoritesStorage', JSON.stringify(this.favoritesStorage));
    }

    remove(key: string): void {

        if (this.favoritesStorage === null) {
            return;
        }

        delete this.favoritesStorage[key];

        localStorage.setItem('favoritesStorage', JSON.stringify(this.favoritesStorage));
    }

    get(key: string): void {

        if (this.favoritesStorage === null) {
            return null;
        }

        return this.favoritesStorage[key];
    }

    getAll(): Array<IFavoriteOptions> {

        if (this.favoritesStorage === null) {
            return null;
        }

        let ret: Array<IFavoriteOptions> = [];

        for (let item in this.favoritesStorage) {
            ret.push(this.favoritesStorage[item]);
        }

        return ret;
    }

}