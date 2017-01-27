import { Observable } from 'rxjs';

export interface IAuctionProviver {
    listIterator: Array<any>;
    getURLs: (iterator: any) => Array<string>;
    getTitle: (html: string) => string;
    getDesc: (html: string) => string;
    getBid: (html: string) => number;
    getEndBid: (html: string) => number;
    getImages: (html: string) => Array<string>;
    getExternalId: (url: string) => string;
    mapForPage: (response: any) => any;
}