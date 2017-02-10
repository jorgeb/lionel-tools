import { Observable } from 'rxjs';

export interface IAuctionProviver {
    listIterator: Array<any>;
    getAuctionId: () => number;
    getURLs: (iterator: any) => Array<string>;
    getTitle: (html: any) => string;
    getDesc: (html: any) => string;
    getBid: (html: any) => number;
    getEndBid: (html: any) => number;
    getImages: (html: any) => Array<string>;
    getExternalId: (url: string) => string;
    mapForPage: (response: any) => any;
}