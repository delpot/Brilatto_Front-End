import { Jewel } from "src/app/jewel/jewel.interface";

export interface JewelModel {
    _id: string;
    name: string;
    description: string;
    image: string;
    jewels?: Jewel[];
  }