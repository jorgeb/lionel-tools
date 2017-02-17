import { Injectable } from '@angular/core';
import { IFavoriteOptions } from './favorite-options.interface';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class FavoriteService {

    private favoritesStorage: { [id: string]: any; };

    public updateInFavorites: ReplaySubject<any> = new ReplaySubject(null);

    constructor() {
        this.favoritesStorage = JSON.parse(localStorage.getItem('favoritesStorage'));
    }

    add(key:string, options: any): void {

        if (this.favoritesStorage === null) {
            this.favoritesStorage = {};
        }

        this.favoritesStorage[key] = options;
        localStorage.setItem('favoritesStorage', JSON.stringify(this.favoritesStorage));

        this.updateInFavorites.next({ action: 'add', favorite: this.get(key) });
    }

    remove(key: string): void {

        if (this.favoritesStorage === null) {
            return;
        }

        const removed = this.get(key);
       
        delete this.favoritesStorage[key];

        localStorage.setItem('favoritesStorage', JSON.stringify(this.favoritesStorage));

        this.updateInFavorites.next({ action: 'delete', favorite: removed });
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

        return ret.sort((v1, v2) => {
            if (v1.key > v2.key) {
                return 1;
            }

            if (v1.key < v2.key) {
                return -1;
            }

            return 0;
        });
    }

}