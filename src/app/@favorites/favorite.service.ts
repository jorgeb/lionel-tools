import { Injectable } from '@angular/core';

@Injectable()
export class FavoriteService {

    public favoritesStorage: Array<any> = [];

    constructor() {
        this.favoritesStorage = JSON.parse(localStorage.getItem('favoritesStorage'));
    }

    add(options: any): void {

        if (this.favoritesStorage === null) {
            this.favoritesStorage = [];
        }
        console.log(this.favoritesStorage)
        this.favoritesStorage.push(options);

        localStorage.setItem('favoritesStorage', JSON.stringify(this.favoritesStorage));
    }
}