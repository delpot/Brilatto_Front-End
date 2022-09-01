import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelModelService } from 'src/app/jewel-model/services/jewel-model.service';
import { Jewel } from '../../jewel.interface';
import { JewelService } from '../../jewel.service';

@Component({
  selector: 'app-jewels-list',
  templateUrl: './jewels-list.component.html',
  styleUrls: ['./jewels-list.component.css']
})
export class JewelsListComponent implements OnInit {

  modelId: string = '';
  jewels: Jewel[] = [];

  constructor(
    private jewelService: JewelService,
    private modelService: JewelModelService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const modelName = this.route.snapshot.paramMap.get('modelName');

    if (!modelName) {
      this.router.navigate(['']);
      return;
    }

    this.jewelService.getAllJewelByModelId(this.modelId).subscribe({
      next: (res) => {
        this.jewels = res;
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
