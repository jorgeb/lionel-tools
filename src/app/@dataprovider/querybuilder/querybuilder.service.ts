import { Injectable } from '@angular/core';
import { IEntity } from '../entity/entity.interface';

export class QueryBuilderService {

    public static sqlROWID = (entity: IEntity, rowId: string): string => {
      return QueryBuilderService.buildSQL('ROWID', entity, rowId);
    }
    public static sqlSelect = (entity: IEntity): string => {
      return QueryBuilderService.buildSQL('SELECT', entity);
    }
    public static sqlInsert = (entity: IEntity): string => {
      return QueryBuilderService.buildSQL('INSERT', entity);
    }
    public static sqlUpdate = (entity: IEntity, rowId?: string): string => {
      return QueryBuilderService.buildSQL('UPDATE', entity, rowId);
    }
    public static persistAsObject = (entity: IEntity, values: any): Object => {
        return QueryBuilderService.getObject(entity, values);
    }
    private static buildSQL = (action: string, entity: IEntity, rowId?: string): string => {

        let ret: string = null;

        switch (action) {
            case 'ROWID': {
                ret = QueryBuilderService.buildSelectRowId(entity);
                break;
            }
            case 'SELECT': {
                ret = QueryBuilderService.buildSelect(entity);
                break;
            }
            case 'INSERT': {
                ret = QueryBuilderService.buildInsert(entity);
                break;
            }
            case 'UPDATE': {
                ret = QueryBuilderService.buildUpdate(entity, rowId);
                break;
            }
            default:
                break;
        }

        return ret;
    }
    private static buildSelectRowId = (entity: IEntity): string => {

        let sql: string;
        /* tslint:disable */
        sql =
            `SELECT ROWID, '${entity.pk.name}' FROM ${entity.name} WHERE '${entity.pk.name}' = '\${item.${entity.pk.propertyKey}}'`;
        return sql;
    }

    private static buildSelect = (entity: IEntity): string => {

        let sql: string;

        sql = `SELECT ${QueryBuilderService.getColumns(entity)} FROM ${entity.name}`;
        return sql;
    }

    private static buildInsert = (entity: IEntity): string => {

        let sql: string;
        /* tslint:disable */
        sql = `INSERT INTO ${entity.name} (${QueryBuilderService.getColumns(entity)}) VALUES (${QueryBuilderService.getVariablesValues(entity)})`;
        return sql;
    }

    private static buildUpdate = (entity: IEntity, rowId: string): string => {
        let sql: string;
        /* tslint:disable */
        sql = `UPDATE ${entity.name} SET ${QueryBuilderService.getVariablesValuesAndColumns(entity)} WHERE ${QueryBuilderService.getVariablesValuesAndColumnsPK(entity)}`;
        return sql;
    }

    private static getColumns = (entity: IEntity, removePK?: boolean): string => {
        let columns: Array<string> = [];
        columns.push(`'${entity.pk.name}'`);

        return columns.concat(entity.columns.map(c => { return `'${c.name}'` })).join(',');
    }

    private static getVariablesValues = (entity: IEntity): string => {
        let columns: Array<string> = [];
        columns.push(`'\${item.${entity.pk.propertyKey}}'`);

        return columns.concat(entity.columns.map(c => { return `'\${item.${c.propertyKey}}'` })).join(',');
    }

    private static getVariablesValuesAndColumns = (entity: IEntity): string => {        
        return entity.columns.map(c => { return `'${c.name}' = '\${item.${c.propertyKey}}'` }).join(',');
    }
    private static getVariablesValuesAndColumnsPK = (entity: IEntity): string => {        
        return `'${entity.pk.name}' = '\${item.${entity.pk.propertyKey}}'`;
    }

    private static getObject = (entity: IEntity, values: any): Object => {
        let columns: string[] = [];
        let ret = {};

        ret[entity.pk.name] = values[entity.pk.propertyKey];
        entity.columns.forEach((column) => {
            ret[column.name] = values[column.propertyKey];
        });
        return ret;
    }

}
