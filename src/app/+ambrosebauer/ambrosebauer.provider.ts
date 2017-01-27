import { Inject } from '@angular/core';
import { IAutionItem, AuctionProvider } from '../@auctions';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

export class AmbrosebauerProvider extends AuctionProvider {

    constructor( @Inject(Http) http: Http) {
        super(http);
        console.log($)

        this.listIterator = [];

        for (let i = 1; i < 10; i++) {
            this.listIterator.push(i);
        }

    }

    public listIterator: Array<any>;
    public getURLs = (iterator: any): Array<string> => {
        return iterator.map(i => {
            return 'http://localhost:3001/url/'
                + encodeURIComponent(`http://ambrosebauer.com/lotdetail.php?auction=264&lot=${i}`);
        });
    };

    public getTitle = (html: string): string => {

        return $('table[width="500"] p font[color="#400000"] b', html).text();
    };

    public getDesc = (html: string): string => { return null };
    public getBid = (html: string): number => { return null };
    public getEndBid = (html: string): number => { return null };
    public getImages = (html: string): Array<string> => { return [] };
    public getExternalId = (html: string): string => { return null };

    public mapForPage = (response): any => {

        let $html: any = $(response._body
            .replace(/src=/g, "data-source="));
        return $html;
    };

}