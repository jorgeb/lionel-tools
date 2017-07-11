import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import { _catch } from 'rxjs/operator/catch';
import { _do } from 'rxjs/operator/do';
import { switchMap } from 'rxjs/operator/switchMap';
import { of } from 'rxjs/observable/of';

import { ILionelItem } from '../@lionel-db/tables/lionel-item.interface';
import { LionelAutocompleteService } from './lionel-autocomplete.service';

@Component({
  selector: 'lionel-autocomplete',
  template: require('./lionel-autocomplete.html'),
  styleUrls: [],
  encapsulation: ViewEncapsulation.None
})
export class LionelAutocompleteComponent implements OnInit{

  public lionelItemDB: ILionelItem = null;
  public searchLionelItems: any;
  public searching: boolean = false;
  public searchFailed: boolean = false;
  public inputFormatter: (ob: any) => string;
  constructor(public lionelAutocompleteService: LionelAutocompleteService) {
  }

  public ngOnInit() {
    this.inputFormatter = (ob: any): string => {
      return ob.title;
    };
    this.searchLionelItems = (text$: Observable<string>) =>
      _do.call(
        switchMap.call(
          _do.call(
            distinctUntilChanged.call(
              debounceTime.call(text$, 300)),
            () => this.searching = true),
          (term) =>
            _catch.call(
              _do.call(
                this.lionelAutocompleteService.searchItem(term),
                () => this.searchFailed = false),
              () => {
                this.searchFailed = true;
                return of.call([]);
              }
            )
        ),
        () => this.searching = false);
  }
}
