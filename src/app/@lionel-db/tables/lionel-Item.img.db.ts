import {
    Entity,
    IEntityDecorator,
    IEntity,
    Column,
    PK,
    IEntityColumnOptions
} from '../../@dataprovider';

import { ILionelItemImgDB } from './lionel-Item.img.interface';
@Entity({ name: '1iVYS6XMviFJPkZqNqQ-mcujExUA66X0c9apvkhQ3' })
export class LionelItemImgDB implements ILionelItemImgDB, IEntityDecorator {
    @PK({ name: 'LionelExternalId' })
    public lionelExternalId: string;
    @Column({ name: 'Images' })
    public images: string;
    @Column({ name: 'LionelId' })
    public lionelId: string;
    @Column({ name: 'Title' })
    public title: string;
    @Column({ name: 'CategoryBySource' })
    public categoryBySource?: string;
    @Column({ name: 'LionelEraId' })
    public lionelEraId: number;

    constructor() {}
}
