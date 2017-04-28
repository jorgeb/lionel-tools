import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/forkJoin';

import { IDataProviver } from './dataprovider.interface';
import { IEntity } from './entity/entity.interface';
import { IEntityDecorator } from './entity/entity.decorator.interface';


export class DataProvider<T extends IEntityDecorator> implements IDataProviver<T> {
   
    public entity: IEntity;
    public get = (value: string | number): Observable<T> => {

        console.log('IDataProviver<T>',this.entity);
        return null;
    }
    public getAll = (): Observable<Array<T>> => { return null };
    public find = (where: string): Observable<Array<T>> => { return null; }
    public save = (dbObject: any): Observable<boolean> => { return null; }
    public update = (dbObject: any): Observable<boolean> => { return null; }

    constructor(type: { new (): T; }) {
        this.entity = new type().getEntityMetaData();
    }

    private buildSQL = (action: string, options: any): string => {

        let ret: string = null;

        switch (action) {

            case 'SELECT': {

                ret = this.buildSelect();
                break;
            }
        }

        return ret;
    }

    private buildSelect = (): string => {

        let sql: string;


        return sql;
    }

}

export class DataProvider2 {

    private myFields: Array<string> = [];
    constructor() {
        /*for (let f in this.myFields) {
            this.myFields.push(f);
        }*/
    }
    /*
        function getSingleAsync<T extends Resource & Identifiable>(arg: T): Promise<T> {
    return fetch(`/api/v1/${arg.resourceName}/${arg.id}`)
        .then((response: Response) => response.json());
}
    */
    public static get = <T>(value: string | number): Observable<T> => {
        
        type Constructor<T> = { new (...args: any[]): T } | ((...args: any[]) => T) | Function;
        let a: T;
        let ts: any = typeof a;
        
        console.log('public static get', typeof a);
        return null;
    }

    public static activator = <T extends IEntityDecorator>(type: { new (): T; }): T => {
        console.log('public static activator', new type().constructor.name);
        console.log('public static activator 2', new type().getEntityMetaData());

      return new type();
    }
}


//1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3