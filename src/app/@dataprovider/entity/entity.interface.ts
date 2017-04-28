import { IEntityColumn } from './entity-column.interface';

export interface IEntity {
    name: string;
    pk: IEntityColumn;
    columns: Array<IEntityColumn>;
}