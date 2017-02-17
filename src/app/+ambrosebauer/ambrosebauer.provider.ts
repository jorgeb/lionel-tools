import { Inject } from '@angular/core';
import { IAutionItem, AuctionProvider } from '../@auctions';
import { Http, Response } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

export class AmbrosebauerProvider extends AuctionProvider {

    constructor( @Inject(Http) http: Http) {
        super(http);

        this.listIterator = [];
        /*
        for (let i = 1; i < 300; i++) {
            this.listIterator.push(i);
        }
        */

    }

    public listIterator: Array<any>;

    public getAuctionId = (): number => {
        return 266;
    };

    public getURLs = (iterator: any): Array<string> => {
        return iterator.map(i => {
            return 'http://localhost:3001/url/'
                + encodeURIComponent(`http://ambrosebauer.com/lotdetail.php?auction=266&lot=${i}`);
        });
    };

    public getTitle = (html: any): string => {

        return $('table[width="500"] p font[color="#400000"]', html).text();
    };

    public getDesc = (html: any): string => {

        return $('table[width="500"] font p[align="justify"]', html).text().trim();
    };

    public getBid = (html: any): number => {
        return +($('form[action="/lotdetail.php"] td[width="91"]', html)
            .text()
            .trim().replace('$', ''));
    };

    public getEndBid = (html: any): number => { return null };
    public getImages = (html: any): Array<string> => {

        let ret = [];

        ret.push('http://ambrosebauer.com'
            + $('img[width="500"]', html).data('src'));

        let rawImgs = $('img[height="170"]', html)
            .get()
            .map((e) => {
            return 'http://ambrosebauer.com' + $(e).data('src');
            }).filter(url => {
                return (url.indexOf('/grey.gif') === -1);
            });

        return ret.concat(rawImgs);
        
    };
    public getExternalId = (url: string): string => {

        return url.replace(
            'http://localhost:3001/url/' + encodeURIComponent(`http://ambrosebauer.com/lotdetail.php?auction=`),
            '')
    };

    public mapForPage = (response): any => {

        let $html: any = $(response._body
            .replace(/src=/g, "data-src="));
        return $html;
    };

}