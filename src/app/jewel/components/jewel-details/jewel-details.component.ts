import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { Converter } from 'src/app/utils/converter.utils';
import { Jewel } from '../../jewel.interface';
import { JewelService } from '../../jewel.service';

@Component({
  selector: 'app-jewel-details',
  templateUrl: './jewel-details.component.html',
  styleUrls: ['./jewel-details.component.css']
})
export class JewelDetailsComponent implements OnInit {
  @Input() jewel: Jewel = {} as Jewel;
  @Input() jewels: Jewel[] = [];
  addedJewels : Map<Jewel, number> = new Map<Jewel, number>();
  // maxQuantityReached: boolean = false;
  cartCounter: number = 0;

  constructor(
    private cartService: CartService,
    private jewelService: JewelService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  addToCart(jewel:Jewel) {
    this.addedJewels = Converter.GetJewelMap();

    const jewelFromMap = Converter.GetJewelFromMap(this.addedJewels, jewel);
    
    if (jewelFromMap) {
      this.addedJewels.set(jewelFromMap, this.addedJewels.get(jewelFromMap)! + 1);
    }else {
      this.addedJewels.set(jewel, 1);
    }      
    Converter.SetJewelMapToLocal(this.addedJewels);

    this.cartService.cartSubject.next(Converter.GetCartCounter(this.addedJewels));
  }

  deleteJewel(jewelId: string) {
    this.jewelService.deleteOneJewel(jewelId).subscribe({
      next: (res) => {
        const newJewelList = this.jewels.filter((jewel) => jewel._id !== res._id);
        this.jewels = newJewelList;
        const modelId = this.route.snapshot.paramMap.get('modelId');
        this.router
        .navigate(['/model/'+ modelId])
        .then(() => window.location.reload());
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }
}
