import { Observable } from 'rxjs';

export interface ILionelProviver {

    URLs: Observable<Array<string>>;
    getTitle: (html: any) => string;
    getDesc: (html: any) => string;
    getCategoryId: (html: any) => number;
    getLionelExternalId: (html: any) => string;
    getLionelPartId: (html: any) => string;
    getEraId: (html: any) => number;
    getImages: (html: any) => Array<string>;
    getCategoryBySource?: (html: any) => string;
    mapForPage: (response: any) => any;
}