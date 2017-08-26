import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/observable/forkJoin';

import { SQLiteService } from './sqlite.service';
import { IDatabase } from './datatabase.interface';
import { IEntity } from '../entity/entity.interface';
import { QueryBuilderService } from '../querybuilder/querybuilder.service';
import { IEntityColumn } from '../entity/entity-column.interface';

import { stringUtil } from '../../@utils';

export class SQLiteDB implements IDatabase {

    constructor() {}
    public Insert = (entity: IEntity, values: any) => {
        let sqlTemplate = QueryBuilderService.sqlInsert(entity);
        sqlTemplate = stringUtil.template(sqlTemplate, values);
        //INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
        return SQLiteService.execute(sqlTemplate);
    }

    public Select<T>(entity: IEntity): Observable<T[]> {
      let sqlTemplate = QueryBuilderService.sqlSelect(entity);
      sqlTemplate = stringUtil.template(sqlTemplate, {});

      return SQLiteService.execute(sqlTemplate)
          .map((r) => this.getObjectFromData<T>(r, entity));
    }

    public Update = (entity: IEntity, values: any) => {return null; }//Observable<any>};

    private getObjectFromData<T> (response: any, entity: IEntity): T[] {
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
            const dataObj: any = {};

            r.forEach((element, idx) => {
                dataObj[objColumns[idx].propertyKey] = element;
            });

            return dataObj;
        });
    }
}
