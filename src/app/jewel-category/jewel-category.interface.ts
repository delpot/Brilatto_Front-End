import { JewelModel } from '../jewel-model/jewel-model.interface';

export interface JewelCategory {
  _id: string;
  name: string;
  photo: string;
  description?: string;
  models?: JewelModel[];
}

export interface CategoryForm {
  name: string;
  photo: string;
  description?: string;
}
