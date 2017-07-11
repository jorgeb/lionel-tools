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
import { IEntityColumn } from './entity/entity-column.interface';

import { FusionTableService } from './fusion-table.service';
export class DataProvider<T extends IEntityDecorator> implements IDataProviver<T> {

    public entity: IEntity;
    public get = (value: string | number): Observable<T> => {

        FusionTableService.execute('SELECT * FROM 1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3')
            .subscribe(data => {
                console.log('select vMM', JSON.parse(data._body))
        });
        console.log('IDataProviver<T>',this.entity);
        return null;
    }
    public getAll = (): Observable<Array<T>> => {
        let sqlTemplate = this.buildSQL('SELECT', this.entity);
        sqlTemplate = stringUtil.template(sqlTemplate, {});
        return FusionTableService.execute(sqlTemplate, true)
            .map((r) => this.getObjectFromData(r, this.entity));
    }
    public find = (where: string): Observable<Array<T>> => { return null; }
    public save = (dbObject: T): Observable<boolean> => {

        let sqlTemplate = this.buildSQL('INSERT', this.entity);
        sqlTemplate = stringUtil.template(sqlTemplate, dbObject);
        //INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
        return FusionTableService.execute(sqlTemplate, true);
    }
    public update = (dbObject: any): Observable<boolean> => { return null; }

    constructor(private type: { new (): T; }) {
        this.entity = new type().getEntityMetaData();
    }

    private buildSQL = (action: string, entity: IEntity): string => {

        let ret: string = null;

        switch (action) {
            case 'SELECT': {
                ret = this.buildSelect(entity);
                break;
            }
            case 'INSERT': {
                ret = this.buildInsert(entity);
                break;
            }
        }

        return ret;
    }

    private buildSelect = (entity: IEntity): string => {

        let sql: string;

        sql = `SELECT ${this.getColumns(entity)} FROM ${entity.name}`;
        return sql;
    }

    private buildInsert = (entity: IEntity): string => {

        let sql: string;

        sql = `INSERT INTO ${entity.name} (${this.getColumns(entity)}) VALUES (${this.getVariablesValues(entity)})`;
        return sql;
    }

    private getColumns = (entity: IEntity): string => {
        let columns: Array<string> = [];
        columns.push(`'${entity.pk.name}'`);

        return columns.concat(entity.columns.map(c => { return `'${c.name}'` })).join(',');
    }

    private getVariablesValues = (entity: IEntity): string => {
        let columns: Array<string> = [];
        columns.push(`'\${item.${entity.pk.propertyKey}}'`);

        return columns.concat(entity.columns.map(c => { return `'\${item.${c.propertyKey}}'` })).join(',');
    }

    private getObjectFromData = (response: any, entity: IEntity): T[] => {
        const data: any = JSON.parse(response._body);
        const objColumns: IEntityColumn[] = data.columns.map((column: string) => {
            if (entity.pk.name === column) {
                return entity.pk;
            } else {
                return entity.columns.find((c) => {
                    return c.name === column;
                });
            }
        });

        return  data.rows.map((r) => {
            const dataObj: T = new this.type();

            r.forEach((element, idx) => {
                dataObj[objColumns[idx].propertyKey] = element;
            });

            return dataObj;
        });
    }
}


//1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3