import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JewelCategoryService {
  constructor() {}

  getAllJewelCategories() {
    return [
      {
        name: 'Bracelets',
        description: '',
        image: 'assets/img/DSC01753.jpg',
      },
      {
        name: 'Rings',
        description: '',
        image: 'assets/img/DSC01753.jpg',
      },
      {
        name: 'Necklaces',
        description: '',
        image: 'assets/img/DSC01753.jpg',
      },
      {
        name: 'Earrings',
        description: '',
        image: 'assets/img/DSC01753.jpg',
      },
    ];
  }
}
