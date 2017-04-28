import { IEntity } from './entity.interface';

export interface IEntityDecorator {
    getEntityMetaData?: () => IEntity;
}