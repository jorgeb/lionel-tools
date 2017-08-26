import { Observable } from 'rxjs';
import { IEntity } from './entity/entity.interface';
export interface IDataColumn {
    name: string;
}
export interface IDataProviver<T, R> {
    get: (value: string | number) => Observable<T>;
    getAll: () => Observable<Array<T>>;
    find: (where: string) => Observable<Array<T>>;
    save: (dbObject: any) => Observable<boolean>;
    update: (dbObject: any) => Observable<boolean>;
    entity: IEntity;
/*
    key: string;
    table: string;
    columns: Array<>;
    */
}