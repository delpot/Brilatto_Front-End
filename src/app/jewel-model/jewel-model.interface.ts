import { Jewel } from "src/app/jewel/jewel.interface";

export interface JewelModel {
    _id: string;
    name: string;
    description: string;
    photo: string;
    jewels?: Jewel[];
  }

  export interface ModelForm {
    categoryId: string;
    name: string;
    description: string;
    photo: string;
  }