import { Jewel } from '../jewel/jewel.interface';

export class Converter {
  static GetJewelFromMap(
    jewelMap: Map<Jewel, number>,
    jewelToFind: Jewel
  ): Jewel {
    return Array.from(jewelMap.keys()).find(
      (j: Jewel) => j._id === jewelToFind._id
    )!!;
  }

  static GetQuantityFromJewel(
    jewelMap: Map<Jewel, number>,
    jewelToFind: Jewel
  ): number {
    return jewelMap.get(jewelToFind)!!;
  }

  static GetCartCounter(jewelMap: Map<Jewel, number>): number {
    let cartCounter = 0;
    jewelMap.forEach(function (value, key) {
      cartCounter += value;
    });

    return cartCounter;
  }

  static GetTotalCart(jewelMap: Map<Jewel, number>): number {
    let totalpanier = 0;
    jewelMap.forEach(function (qte, jewel) {
      totalpanier += qte * jewel.price;
    });

    return totalpanier;
  }

  static GetJewelMap(): Map<Jewel, number> {
    const localCart = localStorage.getItem('cart');
    const jewelMap: Map<Jewel, number> = new Map(JSON.parse(localCart!));
    return jewelMap;
  }

  static SetJewelMapToLocal(jewelMap: Map<Jewel, number>) {
    localStorage.setItem(
      'cart',
      JSON.stringify(Array.from(jewelMap.entries()))
    );
  }

  static clearCart(): void {
    localStorage.removeItem('cart');
    this.GetCartCounter(this.GetJewelMap());
  }
}
