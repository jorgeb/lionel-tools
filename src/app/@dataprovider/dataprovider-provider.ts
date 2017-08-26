import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/forkJoin';

import { stringUtil } from '../@utils';

import { IDataProviver } from './dataprovider.interface';
import { IEntity } from './entity/entity.interface';
import { IEntityDecorator } from './entity/entity.decorator.interface';
import { IDatabase } from './database/datatabase.interface';
export class DataProvider<T extends IEntityDecorator, R extends IDatabase>
                    implements IDataProviver<T, R> {
    public entity: IEntity;
    public database: IDatabase;

    constructor(private type: { new (): T; }, private dbtype: { new (): R; }) {
        this.entity = new type().getEntityMetaData();
        this.database = new dbtype();
    }

    public get = (value: string | number): Observable<T> => {
        return null;
    }
    public getAll = (): Observable<Array<T>> => {
        return this.database.Select<T>(this.entity);
    }

    public find = (where: string): Observable<Array<T>> => { return null; }
    public save = (dbObject: T): Observable<boolean> => {
        return this.database.Insert(this.entity, dbObject);
/*
        let sqlTemplate = this.buildSQL('INSERT', this.entity);
        sqlTemplate = stringUtil.template(sqlTemplate, dbObject);
        //INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
        return FusionTableService.execute(sqlTemplate, true);
        */

    }
    public update = (dbObject: any): Observable<boolean> => {

        /* Get ROWID */
        /*
        let sqlTemplate = this.buildSQL('ROWID', this.entity);
        sqlTemplate = stringUtil.template(sqlTemplate, dbObject);

        FusionTableService.execute(sqlTemplate, false).subscribe((response) => {
            const data: any = JSON.parse(response._body);
            data.rows.forEach((row) => {
                console.log('ROWID', row[0]);
                let sqlUpdateTemplate = this.buildSQL('UPDATE', this.entity, row[0]);
                sqlTemplate = stringUtil.template(sqlUpdateTemplate, dbObject);
                FusionTableService.execute(sqlTemplate, true).subscribe((d) => {
                });
            });
        });
        */
        //INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
        return null;
    }
}
