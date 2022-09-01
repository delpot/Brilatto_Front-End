import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelModel } from '../../interfaces/jewel-model.interface';
import { JewelModelService } from '../../services/jewel-model.service';

@Component({
  selector: 'app-all-models',
  templateUrl: './all-models.component.html',
  styleUrls: ['./all-models.component.css']
})
export class AllModelsComponent implements OnInit {

  categoryName: string = '';
  models: JewelModel[] = [];

  constructor(
    private jewelModelService: JewelModelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const categoryName = this.route.snapshot.paramMap.get('categoryName');

    if (categoryName) {
      this.categoryName = categoryName;
    } else {
      this.router.navigate(['']);
      return;
    }

    this.jewelModelService.getAllJewelModelsByCategoryName(this.categoryName).subscribe({
      next: (res) => {
        this.models = res;
        // for (const model of this.models) {
        //   const imagePath = `./assets/img/${model.image}`;
        //   model.image = imagePath;
        // }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

}
