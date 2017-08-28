import { ILionelImage } from './lionel-image.interface';

export interface ILionelItemSQL {
  id: number;
  lionelId: string;
  title: string;
  tags: string;
  images: ILionelImage[];
  getFrom: string;
}
