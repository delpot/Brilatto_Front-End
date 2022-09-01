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

  categoryId: string = '';
  models: JewelModel[] = [];

  constructor(
    private jewelModelService: JewelModelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    if (categoryId) {
      this.categoryId = categoryId;
    } else {
      this.router.navigate(['']);
      return;
    }

    this.jewelModelService.getAllJewelModelsByCategoryId(this.categoryId).subscribe({
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
