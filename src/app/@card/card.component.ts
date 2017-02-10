import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { ICardOptions } from './card-options.interface';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  selector: 'lt-card',
  template: require('./card.html'),
  styleUrls: ['./card.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CardComponent {

    @Input()
    public options: ICardOptions;

    constructor() {}

    public onClick() {
        console.log('card')

    }
}