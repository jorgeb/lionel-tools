import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/forkJoin';

import { IAutionItem } from './auction-item.interface';
import { IAuctionProviver } from './auction-provider.interface';

export abstract class AuctionProvider implements IAuctionProviver {


    constructor(protected http: Http) {

    }

    public abstract listIterator: Array<any>;
    public abstract getURLs = (iterator: any): Array<string> => { return null };

    public abstract getTitle = (html: string): string => { return null };
    public abstract getDesc = (html: string): string => { return null };
    public abstract getBid = (html: string): number => { return null };
    public abstract getEndBid = (html: string): number => { return null };
    public abstract getImages = (html: string): Array<string> => { return [] };
    public abstract getExternalId = (html: string): string => { return null };
    public abstract mapForPage = (response): any => { return null };

    public getAuctionItems = (): Observable<IAutionItem[]> => {
               
        return Observable.forkJoin(this.getHTTPpromises())
            .map(this.parsePage);
        
    }

    private parsePage = (page): Array<IAutionItem> => {
        console.log(page);
        console.log(this.getTitle(page[0]));
        return [];
    }
    /*
    private getHTTPpromises = (): Array<Observable<Response>> => {

        let ret: Array<Observable<Response>> = [];
        this.getURLs(this.listIterator).forEach(u => {
            ret.push(this.http.get(u));
        });

        return ret;
    }*/

    private getHTTPpromises = (): Array<Observable<any>> => {

        let ret: Array<Observable<any>> = [];
        this.getURLs(this.listIterator).forEach(u => {
            ret.push(this.http.get(u).map(this.mapForPage));
        });

        return ret;
    }

}
