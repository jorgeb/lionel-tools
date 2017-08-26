import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class LiveAuctionersService {
    private endPoint: string = 'https://api.liveauctioneers.com/search/web/prod';
    private endPointDetail: string = 'https://item-api-prod.liveauctioneers.com/spa/small/items?c=20170802';

    constructor(private http: Http) {}

    public search = (options: ILiveAuctionersOptions): Observable<any> => {

        let myParams = new URLSearchParams();
        myParams.set('parameters', JSON.stringify(options));

        let httpOptions = new RequestOptions({search: myParams });

        return  this.http
            .get(this.endPoint, httpOptions)
            .map((res: Response) => res.json());
    }

    public searchImagesInPast = (options: ILiveAuctionersOptions): Observable<any> => {

        return Observable.create((observer: Observer<any>) => {
            this.search(options).subscribe((items) => {

                const headers = new Headers({
                    'Content-Type': 'application/json'
                });

                this.http
                    .post(this.endPointDetail,
                    JSON.stringify({
                        ids: items.itemIDs
                    }),
                    { headers }
                    )
                    .map((res: Response) => res.json())
                    .subscribe((detail) => {
                        observer.next(
                            detail.data.items.map((item) => {
                                return `https://p1.liveauctioneers.com/${item.sellerId}/${item.catalogId}/${item.itemId}_1_m.jpg?version=${item.imageVersion}`;
                        }));
                        observer.complete();
                    });
            });

        });
    }

    public searchImagesInPastByQuery = (query: string): Observable<any> => {

        return this.searchImagesInPast({
            categories: [], distance: {},
            options: { status: ['sold', 'passed', 'done'] },
            page: 1,
            pageSize: 10,
            ranges: {},
            searchTerm: query,
            sort: '-relevance'
        });
    }

}
export interface ILiveAuctionersOptions {
    categories: string[];
    distance: any;
    options: { status: ['sold', 'passed', 'done'] };
    page: number;
    pageSize: number;
    ranges: any;
    searchTerm: string;
    sort: string;
}
