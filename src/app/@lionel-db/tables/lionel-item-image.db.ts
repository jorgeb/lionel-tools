import {
  Entity,
  IEntityDecorator,
  IEntity,
  Column,
  PK,
  IEntityColumnOptions
} from '../../@dataprovider';

import { ILionelItemSQL } from './lionel-item-image.interface';
import { ILionelImage } from './lionel-image.interface';

@Entity({ name: 'LionelItemImage' })
export class LionelItemSQLDB implements ILionelItemSQL, IEntityDecorator {

  @PK({ name: 'Id' })
  public id: number;
  @Column({ name: 'Title' })
  public title: string;
  @Column({ name: 'LionelId' })
  public lionelId: string;
  @Column({ name: 'Tags' })
  public tags: string;
  @Column({ name: 'Images' })
  public images: ILionelImage[];
  @Column({ name: 'GetFrom' })
  public getFrom: string;
  constructor() {}
}
