import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { AmbrosebauerProvider } from './ambrosebauer.provider';
import { IPager } from '../@pager';
import { IAutionItem } from '../@auctions';
import { arrayUtil } from '../@utils';
import { Observable } from 'rxjs';

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
    constructor(private http: Http) {

    }

    public ngOnInit() {

       
    }
    public onPageChange(event) {
        console.log(event);

        this.auctionItemsNOSplit = event;
        this.auctionItems = arrayUtil.arrayToTable(event, 4);
    }

    public getData = (pager: IPager): Observable<any> => {

        console.log(pager);

        let ts: AmbrosebauerProvider = new AmbrosebauerProvider(this.http);
        ts.listIterator = arrayUtil.range(pager.startIndex + 1, pager.endIndex + 2);
        console.log(arrayUtil.range(pager.startIndex + 1, pager.endIndex + 2));
        return ts.getAuctionItems();
    };
  
}
