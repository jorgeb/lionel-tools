import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions, URLSearchParams, RequestOptions } from '@angular/http';

import { TandemProvider } from './tandem.provider';
import { ILionelItem } from '../@lionel-db/tables/lionel-item.interface';
import { ILionelImage } from '../@lionel-db/tables/lionel-image.interface';
import { LionelImageSQL } from '../@lionel-db/lionel-db';

import { LiveAuctionersService } from '../@liveauctioners/liveauctioners.service';

import { SQLiteService } from '../@dataprovider/database/sqlite.service';

import {
    Observable,
    Observer,
    Subscription
} from 'rxjs';

import { LionelItems, LionelItemImg } from '../@lionel-db';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
    selector: 'tandem',
    template: require('./tandem.html'),
})
export class TandemComponent implements OnInit {
    public lionelItems: ILionelItem[] = [];
    public lionelsearchLA: any[] = [];

    constructor(private http: Http, private liveAuctionersService: LiveAuctionersService) {

/*        SQLiteService.createDB().subscribe((r) => {
            console.log(r);
        });
*/
/*
        LionelItemsSQLite.save({categoryBySource:'Test', desc: 'Test',
        images: 'Test', lionelEraId: 1, lionelExternalId:'Test', lionelId: 'Test990', title: 'Test', lionelPartId: 'Test', categoryId: 2 }).subscribe((r) => {
            console.log(r);
        });
  */
    }

    public ngOnInit() {
        this.http
            .get('http://localhost:3001/sql/LionelItem')
            .map((res: Response) => res.json())
            .subscribe((data) => {
                data.forEach ( i => {
                    this.liveAuctionersService.searchImagesInPastByQuery(`lionel ${i.LionelId}`).subscribe((r) => {
                        console.log(`lionel ${i.LionelId}`);
                        r.forEach(img => {
                            const lionelImage: ILionelImage = {
                                fileName: img,
                                id: null,
                                isDefault: false,
                                lionelId: i.Id,
                                source: 'liveauctioner',
                                title: 'Test 1',
                                url: img
                            };

                            LionelImageSQL.save(lionelImage).subscribe((data) => {
                            });
                        });
                    });
                });
            });

        const ts: TandemProvider = new TandemProvider(this.http);

        const headers = new Headers({
            'Content-Type': 'application/json'
          });
/*
JSON.stringify({
            categories: [], distance: {},
            options: { status: ['sold', 'passed', 'done'] },
            page: 1,
            pageSize: 72,
            ranges: {},
            searchTerm: 'lionel 773',
            sort: '-relevance'
        })
*/
        let myParams = new URLSearchParams();
        myParams.set('parameters', JSON.stringify({
            categories: [], distance: {},
            options: { status: ['sold', 'passed', 'done'] },
            page: 1,
            pageSize: 5,
            ranges: {},
            searchTerm: 'lionel 3444',
            sort: '-relevance'
        }));
        let options = new RequestOptions({search: myParams });
/*
        const lionelImage: ILionelImage = {
            fileName: 'ts1',
            id: null,
            isDefault: false,
            lionelId: 5588,
            source: 'liveauctioner',
            title: 'Test 1',
            url: 'www.go.cc'
        };

        LionelImageSQL.save(lionelImage).subscribe((data) => {
            console.log(data);
        });
*/
        this.http
            .get('https://api.liveauctioneers.com/search/web/prod', options)
            .map((res: Response) => res.json())
            .subscribe((data) => {
                //itemIDs
                this.http
                    .post('https://item-api-prod.liveauctioneers.com/spa/small/items?c=20170802',
                    JSON.stringify({
                        ids: data.itemIDs
                    }),
                    { headers }
                    )
                    .map((res: Response) => res.json())
                    .subscribe((data2) => {
                        this.lionelsearchLA = data2.data.items.map((item) => {
                            return  `https://p1.liveauctioneers.com/${item.sellerId}/${item.catalogId}/${item.itemId}_1_m.jpg?version=${item.imageVersion}`;
                        });
                    //https://p1.liveauctioneers.com/610/27389/10360340_1_x.jpg?version=1321649136
                    //https://p1.liveauctioneers.com/sellerId/catalogId/itemId_1_x.jpg?version=1321649136

                        console.log(data2);
                    });
            });
/*
        this.http
            .post('https://item-api-prod.liveauctioneers.com/spa/small/items?c=20170802',
            JSON.stringify({
                ids: [652587, 652587, 13776660, 9730335, 10360340, 39063050]
            }),
            { headers }
            )
            .map((res: Response) => res.json())
            .subscribe((data) => {
                console.log(data);
            });
*/
            /*
        this.http
        .post('http://localhost:3001/sql/LionelItem',
            JSON.stringify({LionelId: '773', Title: 'vMM', Description : 'ywap', LionelEraId : 1}),
            {headers}
        ).subscribe((data) => {
            console.log(data);
        });
*/
/*
        this.http
            .get('http://localhost:3001/sql/LionelItem/1')
            .map((res: Response) => res.json())
            .subscribe((data) => {
                console.log(data);
            });
*/
/*
        ts.URLs.subscribe((urls) => {
            Object.keys(ts.LionelItemIdByURL).forEach((key) => {
                const lionelExternalId = ts.LionelItemIdByURL[key];

                let ts2: TandemProvider = new TandemProvider(this.http,
                    ['http://localhost:3001/url/' + encodeURIComponent(key)]);
console.log('http://localhost:3001/url/' + encodeURIComponent(key));
                ts2.getLionelItems().subscribe((items) => {
                    items.forEach((it) => {
                        it.images = (<string[]> it.images).join(',');
                        it.lionelExternalId = lionelExternalId;
                        this.http
                            .post('http://localhost:3001/sql/LionelItem',
                            JSON.stringify({
                                LionelId: lionelExternalId,
                                Title: it.title,
                                Description: it.desc,
                                LionelEraId: 1,
                                Tags: it.images,
                                GetFrom: it.lionelPartId
                            }),
                            { headers }
                            ).subscribe((data) => {
                                //console.log(data);
                            });

                        //console.log(it);
                        //LionelItemsSQLite.save(it).subscribe((r) => {});
                    });
                });

            });
        });
*/
/*
        console.log(lionelPwUrls.filter((item, pos, urls) => {
            return urls.indexOf(item) === pos;
            }));*/
/*
        let ts2: TandemProvider = new TandemProvider(this.http);

        ts2.getLionelItems().subscribe((i) => {

            Observable.interval(5500)
                .takeWhile(() => (i.length > 0))
                .subscribe(() => {
                    console.log(i.length);
                    if (i.length > 0) {
                        const li = i[0];
                        LionelItemImg.update({
                            lionelExternalId: li.lionelExternalId,
                            images: li.images.join()
                        });
                        //LionelItems.save(li).subscribe((data) => {});
                        i.shift();
                    }
                });

        });

        */
/*
        let ts: LionelPWProvider = new LionelPWProvider(this.http);

        ts.getLionelItems().subscribe(i => {
            console.log('ts.inURLs');
            console.log('=========');
            console.log(ts.inURLs);

            console.log('ts.inURLs');
            console.log('=========');
            console.log(ts.inURLs.filter((item, pos, urls) => {
                return ts.inURLs.indexOf(item) === pos;
            }));
        });
        */
/*
        ts.getLionelItems().subscribe(i => {

            console.log(i)
            let ts2: LionelPWProvider = new LionelPWProvider(this.http, ts.inURLs);

            ts2.getLionelItems().subscribe(i => {

                console.log(i)

            });

        });
  */
    }
}

//https://p1.liveauctioneers.com/610/27389/10360340_1_x.jpg?version=1321649136
//https://p1.liveauctioneers.com/sellerId/catalogId/itemId_1_x.jpg?version=1321649136

//https://api.liveauctioneers.com/search/web/prod?parameters={"categories":[],"distance":{},"options":{"status":["sold","passed","done"]},"page":1,"pageSize":72,"ranges":{},"searchTerm":"lionel 773","sort":"-relevance"}&c=20170802
/*
27389
conditionReport
:
null
highBidEstimate
:
800
imageVersion
:
1321649136
index
:
2
isAvailable
:
false
isLocked
:
true
isPassed
:
false
isSold
:
true
itemId
:
10360340
lotNumber
:
"0604"
lowBidEstimate
:
400
photos
:
(2) [1, 2]
salePrice
:
800
sellerId
:
610
soldType
:
1
startPrice
:
200
title
:
"604: Restored Lionel Gray 400E"
*/