import { Injectable } from '@angular/core';

@Injectable()
export class FavoriteService {

    public favoritesStorage: { [id: string]: any; };

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


}