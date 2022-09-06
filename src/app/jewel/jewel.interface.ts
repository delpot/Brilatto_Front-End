export interface Jewel {
    _id: string;
    name: string;
    quantityInStock: number;
    price: number;
    photo1: string;
    photo2: string;
    description: string;
  }

  export interface JewelForm {
    modelId: string;
    name: string;
    quantityInStock: number;
    price: number;
    photo1: string;
    photo2: string;
    description: string;
  }