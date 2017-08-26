import { Observable } from 'rxjs';
import { IEntity } from '../entity/entity.interface';

export interface IDatabase {
    Insert: (entity: IEntity, values: any) => Observable<any>;
    Update: (entity: IEntity, values: any) => Observable<any>;
    Select<T>(entity: IEntity): Observable<T[]>;
}
