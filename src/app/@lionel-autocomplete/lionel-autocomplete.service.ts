import { Injectable } from '@angular/core';
import { ICloudinaryResource } from './cloudinary-resource.interface';
import { Observable } from 'rxjs';

import { LionelItems } from '../@lionel-db';
import { ILionelItem } from '../@lionel-db/tables/lionel-item.interface';

@Injectable()
export class LionelAutocompleteService {
    private data: ILionelItem[] = null;
    constructor() {
        this.getData().subscribe((r) => this.data = r);
    }

    public searchItem = (tag: string): Observable<any> => {
      return this.getData().map((lis: ILionelItem[]) => {
        return lis.filter((li: ILionelItem) => {
          return li.title.indexOf(tag) >= 0;
        });
      });
    }

    private getData = (): Observable<ILionelItem[]> => {

      if (this.data) {
        return Observable.of(this.data);
      } else {
        return LionelItems.getAll();
      }
    }
}
