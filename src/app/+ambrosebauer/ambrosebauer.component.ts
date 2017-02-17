import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { AmbrosebauerProvider } from './ambrosebauer.provider';
import { IPager } from '../@pager';
import { IAutionItem } from '../@auctions';
import { arrayUtil } from '../@utils';
import {
    Observable,
    Observer,
    Subscription
} from 'rxjs';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'ambrosebauer',
  template: require('./ambrosebauer.html'),
})
export class AmbrosebauerComponent implements OnInit {
    
    public auctionItems: Array<IAutionItem> = [];
    public auctionItemsNOSplit: Array<IAutionItem> = [];

    private spinnerHandler: Subscription;
    private spinnerObs: Observer<any>;

    constructor(private http: Http) {

    }

    public ngOnInit() {

    }

    public onPageChange(event) {
        console.log(event);

        this.auctionItemsNOSplit = event;
        this.auctionItems = arrayUtil.arrayToTable(event, 4);

        this.spinnerObs.complete();
    }

    public getData = (pager: IPager): Observable<any> => {

        let ts: AmbrosebauerProvider = new AmbrosebauerProvider(this.http);
        ts.listIterator = arrayUtil.range(pager.startIndex + 1, pager.endIndex + 2);
        console.log(arrayUtil.range(pager.startIndex + 1, pager.endIndex + 2));

        this.spinnerHandler = Observable.create(observer => {
            this.spinnerObs = observer;
        }).subscribe();

        return ts.getAuctionItems();
    };

    public getData_ = (pager: IPager): Observable<any> => {

        let dummy = Observable.create(observer => {
            this.spinnerObs = observer;
        });

        this.spinnerHandler = dummy.subscribe();

        return dummy; 
    };
  
}
