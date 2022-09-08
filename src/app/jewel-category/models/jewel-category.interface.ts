import { JewelModel } from '../../jewel-model/models/jewel-model.interface';

export interface JewelCategory {
  _id: string;
  name: string;
  photo: string;
  description?: string;
  models?: JewelModel[];
}
