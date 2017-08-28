import { Injectable } from '@angular/core';
import { ICloudinaryResource } from './cloudinary-resource.interface';
import { Observable } from 'rxjs';

import { LionelItemSQL } from '../@lionel-db/lionel-db';
import { ILionelItemSQL } from '../@lionel-db/tables/lionel-item-image.interface';

@Injectable()
export class LionelAutocompleteService {
    private data: ILionelItemSQL[] = null;
    constructor() {
        this.getData().subscribe((r) => this.data = r);
    }

    public searchItem = (tag: string): Observable<any> => {
      return this.getData().map((lis: ILionelItemSQL[]) => {
        return lis.filter((li: ILionelItemSQL) => {
          return li.title.indexOf(tag) >= 0;
        })
        .splice(0, 10);
      });
    }

    private getData = (): Observable<ILionelItemSQL[]> => {

      if (this.data) {
        return Observable.of(this.data);
      } else {
        return LionelItemSQL.getAll();
      }
    }
}
