import {
    Entity,
    IEntityDecorator,
    IEntity,
    Column,
    PK,
    IEntityColumnOptions
} from '../../@dataprovider';

import { ILionelItem } from './lionel-item.interface';

//@Entity({ name: '1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3' })
@Entity({ name: 'LionelItems' })
export class LionelItemDB implements ILionelItem, IEntityDecorator {

    @PK({ name: 'LionelId' })
    public lionelId: string;
    @Column({ name: 'Title' })
    public title: string;
    @Column({ name: 'Desc' })
    public desc?: string;
    @Column({ name: 'Images' })
    public images: Array<string> | string;
    public categoryId: number;
    @Column({ name: 'CategoryBySource' })
    public categoryBySource?: string;
    @Column({ name: 'LionelExternalId' })
    public lionelExternalId: string;
    @Column({ name: 'LionelPartId' })
    public lionelPartId?: string;
    @Column({ name: 'LionelEraId' })
    public lionelEraId: number;
    constructor() {}
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

