import {
  Component,
  OnInit,
} from '@angular/core';

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
  selector: 'dashboard',
  template: require('./dashboard.html'),
})
export class DashboardComponent implements OnInit {

    constructor() {
    }

    public ngOnInit() {

    }
}
