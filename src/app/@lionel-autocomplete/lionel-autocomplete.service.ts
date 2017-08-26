import { Injectable } from '@angular/core';
import { ICloudinaryResource } from './cloudinary-resource.interface';
import { Observable } from 'rxjs';

import { LionelItemImg } from '../@lionel-db';
import { ILionelItemImgDB } from '../@lionel-db/tables/lionel-Item.img.interface';

@Injectable()
export class LionelAutocompleteService {
    private data: ILionelItemImgDB[] = null;
    constructor() {
        this.getData().subscribe((r) => this.data = r);
    }

    public searchItem = (tag: string): Observable<any> => {
      return this.getData().map((lis: ILionelItemImgDB[]) => {
        return lis.filter((li: ILionelItemImgDB) => {
          return li.title.indexOf(tag) >= 0;
        })
        .splice(0, 10);
      });
    }

    private getData = (): Observable<ILionelItemImgDB[]> => {

      if (this.data) {
        return Observable.of(this.data);
      } else {
        return LionelItemImg.getAll();
      }
    }
}
