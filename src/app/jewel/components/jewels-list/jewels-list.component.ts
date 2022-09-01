import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelModelService } from 'src/app/jewel-model/jewel-model.service';
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
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const modelId = this.route.snapshot.paramMap.get('modelId');

    if (modelId) {
      this.modelId = modelId;
    } else {
      this.router.navigate(['']);
      return;
    }

    this.jewelService.getAllJewelsByModelId(this.modelId).subscribe({
      next: (res) => {
        this.jewels = res;
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

}
