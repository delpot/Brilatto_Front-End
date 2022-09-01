import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelModel } from '../../jewel-model.interface';
import { JewelModelService } from '../../jewel-model.service';

@Component({
  selector: 'app-all-models',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

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
