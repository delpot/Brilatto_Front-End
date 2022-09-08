import { Jewel } from 'src/app/jewel/models/jewel.interface';

export interface JewelModel {
  _id: string;
  name: string;
  description: string;
  photo: string;
  jewels?: Jewel[];
}
