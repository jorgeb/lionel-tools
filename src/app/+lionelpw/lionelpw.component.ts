import {
  Component,
  OnInit,
} from '@angular/core';

import { Http, Response, Headers, ResponseOptions } from '@angular/http';

import { LionelPWProvider } from './lionelpw.provider';
import { ILionelItem } from '../@lionel/lionel-item.interface';
import { Authorization } from '../@authorization/authorization.service';
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
    selector: 'lionelpw',
    template: require('./lionelpw.html'),
})
export class LionelPWComponent implements OnInit {
    
    public lionelItems: Array<ILionelItem> = [];
    
    private spinnerHandler: Subscription;
    private spinnerObs: Observer<any>;

    constructor(private http: Http, private authorization: Authorization) {

      
    }

    public ngOnInit() {
        let ts: LionelPWProvider = new LionelPWProvider(this.http);

        //console.log(this.authorization.signIn());


        ts.getLionelItems().subscribe(i => {

            console.log(i)
            
            let ts2: LionelPWProvider = new LionelPWProvider(this.http, ts.inURLs);

            ts2.getLionelItems().subscribe(i => {

                console.log(i)

            });


        });
        
    }

    public login() {
        console.log('vMM');
        this.authorization.signIn();
    }
    //this.spinnerObs.complete();
    /*
            this.spinnerHandler = Observable.create(observer => {
            this.spinnerObs = observer;
        }).subscribe();

    */
}
