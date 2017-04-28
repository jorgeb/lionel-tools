import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { KeyedCollection, IKeyedCollection } from '../../@utils';

import { IEntity } from './entity.interface';
import { IEntityOptions } from './entity-options.interface';
import { IEntityColumn } from './entity-column.interface';

export class  EntityService {
    private static entities: KeyedCollection<IEntity> = new KeyedCollection<IEntity>();

    public static getAll(): Array<IEntity> {
        return this.entities.Values();
    }

    public static get(className: string): IEntity {
        return this.entities.Item(className);
    }

    public static add(className: string, options: IEntityOptions): IEntity {

        let entity: IEntity = this.entities.Item(className);

        if (!entity) {
            entity = { name: options.name, pk: null, columns: [] };
            this.entities.Add(className, entity);
        } else {
            entity.name = entity.name ? entity.name : options.name;
        }
        
        return entity;
    }

    public static addColumn(className: string, options: IEntityColumn): IEntity {

        let entity: IEntity = EntityService.add(className, { name: null });
        entity.columns.push(options);

        return entity;
    }

    public static addPrimaryKey(className, options: IEntityColumn): IEntity {

        let entity: IEntity = EntityService.add(className, { name: null });
        entity.pk = options;

        return entity;
    }

}


/*
module MyModule {
    export function myStaticFunction() {

    }
}
*/
