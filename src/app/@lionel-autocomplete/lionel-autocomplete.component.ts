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

import { ILionelItemImgDB } from '../@lionel-db/tables/lionel-Item.img.interface';
import { LionelAutocompleteService } from './lionel-autocomplete.service';

@Component({
  selector: 'lionel-autocomplete',
  template: require('./lionel-autocomplete.html'),
  styleUrls: ['./lionel-autocomplete.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LionelAutocompleteComponent implements OnInit{

  public lionelItemDB: ILionelItemImgDB = null;
  public searchLionelItems: any;
  public searching: boolean = false;
  public searchFailed: boolean = false;
  public inputFormatter: (ob: any) => string;
  public lionelResult: ILionelItemImgDB[] = [];
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
                (r) => {
                  this.searchFailed = false;
                  this.lionelResult = r;
                }),
              () => {
                this.searchFailed = true;
                return of.call([]);
              }
            )
        ),
        () => this.searching = false);
  }
}
