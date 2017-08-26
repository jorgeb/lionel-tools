import {
  Entity,
  IEntityDecorator,
  IEntity,
  Column,
  PK,
  IEntityColumnOptions
} from '../../@dataprovider';

import { ILionelImage } from './lionel-image.interface';
@Entity({ name: 'LionelImage' })
export class LionelImageDB implements ILionelImage, IEntityDecorator {
  @PK({ name: 'Id' })
  public id: number;
  @Column({ name: 'LionelId' })
  public lionelId: number;
  @Column({ name: 'FileName' })
  public fileName: string;
  @Column({ name: 'Url' })
  public url: string;
  @Column({ name: 'Title' })
  public title?: string;
  @Column({ name: 'IsDefault' })
  public isDefault: boolean;
  @Column({ name: 'Source' })
  public source?: string;

  constructor() {}
}
