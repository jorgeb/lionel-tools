import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import * as $ from 'jquery';

@Injectable()
export class LionelPWService {

    constructor( @Inject(Http) private http: Http) {

    }

    public getUrls = (): Observable<Array<string>> => {
        return null;
    }

    private parseMenu = (response): Array<string> => {
        return [];
    };
}