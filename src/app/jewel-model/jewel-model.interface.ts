import { Jewel } from "src/app/jewel/jewel.interface";

export interface JewelModel {
    name: string;
    description: string;
    image: string;
    jewels?: Jewel[];
  }