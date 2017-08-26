import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { LionelPWProvider } from './lionelpw.provider';
import { ILionelItem } from '../@lionel-db/tables/lionel-item.interface';
import { Authorization } from '../@authorization/authorization.service';
import {
    Observable,
    Observer,
    Subscription
} from 'rxjs';

import { LionelItems, LionelItemImg } from '../@lionel-db';
import { lionelPwUrls } from './lionel-urls.mock';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
    selector: 'lionelpw',
    template: require('./lionelpw.html'),
})
export class LionelPWComponent implements OnInit {
    public lionelItems: ILionelItem[] = [];
    private spinnerHandler: Subscription;
    private spinnerObs: Observer<any>;

    constructor(private http: Http, private authorization: Authorization) {
    }

    public ngOnInit() {

        //let ts: LionelPWProvider = new LionelPWProvider(this.http);
/*
        ts.URLs.subscribe(urls => {
            console.log(urls.filter((item, pos, a) => {
            return a.indexOf(item) === pos;
            }));
        });
*/
/*
        console.log(lionelPwUrls.filter((item, pos, urls) => {
            return urls.indexOf(item) === pos;
            }));*/

        let ts2: LionelPWProvider = new LionelPWProvider(this.http, lionelPwUrls);

        ts2.getLionelItems().subscribe((i) => {

            Observable.interval(5500)
                .takeWhile(() => (i.length > 0))
                .subscribe(() => {
                    console.log(i.length);
                    if (i.length > 0) {
                        const li = i[0];
                        LionelItemImg.update({
                            lionelExternalId: li.lionelExternalId,
                            images: (<string[]> li.images).join()
                        });
                        //LionelItems.save(li).subscribe((data) => {});
                        i.shift();
                    }
                });

        });
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

    public login() {
        console.log('vMM');
        this.authorization.signIn();
    }


}
