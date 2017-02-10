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
    public abstract getAuctionId = (): number => { return null };
    public abstract getTitle = (html: any): string => { return null };
    public abstract getDesc = (html: any): string => { return null };
    public abstract getBid = (html: any): number => { return null };
    public abstract getEndBid = (html: any): number => { return null };
    public abstract getImages = (html: any): Array<string> => { return [] };
    public abstract getExternalId = (url: string): string => { return null };
    public abstract mapForPage = (response): any => { return null };

    public getAuctionItems = (): Observable<IAutionItem[]> => {
               
        return Observable.forkJoin(this.getHTTPpromises())
            .map(this.parsePages);
        
    }

    private parsePages = (pages: Array<any>): Array<IAutionItem> => {

        let urls: Array<string> = this.getURLs(this.listIterator);

        return pages.map((page, ind) => {
            
            return {
                auction: this.getAuctionId(),
                title: this.getTitle(page),
                desc: this.getDesc(page),
                bid: this.getBid(page),
                endBid: this.getBid(page),
                images: this.getImages(page),
                externalId: this.getExternalId(urls[ind]),
                Id: ind,
                sortOrder: ind
            };
        });
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
