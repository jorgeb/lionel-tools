import {
    Entity,
    IEntityDecorator,
    IEntity,
    Column,
    PK,
    IEntityColumnOptions
} from '../../@dataprovider';

import { ILionelItem } from './lionel-item.interface';

@Entity({ name: '1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3' })
export class LionelItemDB implements ILionelItem, IEntityDecorator {

    @PK({ name: 'LionelId' })
    lionelId: string;
    @Column({ name: 'Title' })
    title: string;
    @Column({ name: 'Desc' })
    desc?: string;
    images: Array<string>;
    categoryId: number;
    @Column({ name: 'CategoryBySource' })
    categoryBySource?: string;
    @Column({ name: 'LionelExternalId' })
    lionelExternalId: string;
    @Column({ name: 'LionelPartId' })
    lionelPartId?: string;
    @Column({ name: 'LionelEraId' })
    lionelEraId: number;

    constructor() {
    }

}

@Entity({ name: 'LionelAge' })
export class LionelAgeDB {

    @Column()
    public Title: string = null;

    @PK()
    public Id: string = null;

    constructor() {
    }

}

//SELECT * FROM 1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3

/*
INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)
{ {;INSERT INTO <table_id> (<column_name> {, <column_name>}*) VALUES (<value> {, <value>}*)}* ;}
*/

