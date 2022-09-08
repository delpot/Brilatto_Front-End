import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelModel } from '../../jewel-model.interface';
import { JewelModelService } from '../../jewel-model.service';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css'],
})
export class ModelDetailsComponent {
  @Input() model: JewelModel = {} as JewelModel;
  @Input() models: JewelModel[] = [];
  @Input() isAdmin: boolean = false;

  constructor(
    private modelService: JewelModelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  deleteModel(modelId: string) {
    this.modelService.deleteOneModel(modelId).subscribe({
      next: (res) => {
        const newModelList = this.models.filter(
          (model) => model._id !== res._id
        );
        this.models = newModelList;
        const categoryId = this.route.snapshot.paramMap.get('categoryId');
        this.router
          .navigate(['/' + categoryId])
          .then(() => window.location.reload());
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      },
    });
  }
}
