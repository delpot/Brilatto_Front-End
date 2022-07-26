import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { JewelModel } from '../../models/jewel-model.interface';
import { JewelModelService } from '../../jewel-model.service';
import { AddModelForm } from '../../models/add-model-form.interface';

@Component({
  selector: 'app-all-models',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css'],
})
export class ModelsListComponent implements OnInit {
  categoryId: string = '';
  models: JewelModel[] = [];
  modelDto: AddModelForm;
  modelForm: FormGroup;
  isAdmin: boolean = false;
  missingFields: boolean = false;

  constructor(
    private modelService: JewelModelService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.modelDto = {
      categoryId: '',
      name: '',
      photo: '',
      description: '',
    };
    this.modelForm = this.formBuilder.group({
      name: [null, Validators.required],
      photo: [null, Validators.required],
      description: [null],
    });
    this.isAdmin = this.authService.tokenPayload
      ? this.authService.tokenPayload.isAdmin
      : false;
  }

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');

    if (categoryId) {
      this.categoryId = categoryId;
    } else {
      this.router.navigate(['']);
      return;
    }

    this.modelService.getAllJewelModelsByCategoryId(this.categoryId).subscribe({
      next: (res) => {
        this.models = res;

        if (!this.isAdmin && this.models.length === 0) {
          this.router.navigate(['not-found']);
        }

        for (const model of this.models) {
          const imagePath = `./assets/photos/models/${model.photo}`;
          model.photo = imagePath;
        }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      },
    });
  }

  onSubmit(): void {
    this.modelDto.categoryId = this.categoryId;
    this.modelDto.name = this.modelForm.controls['name'].value;
    this.modelDto.photo = this.modelForm.controls['photo'].value;
    this.modelDto.description = this.modelForm.controls['description'].value;

    this.missingFields = false;

    this.modelService.addOneModel(this.modelDto).subscribe({
      next: (res) => {
        console.log(res);
        alert(`Nouveau modèle ${res.name} ajouté!`);
        this.router
          .navigate(['/' + this.categoryId])
          .then(() => window.location.reload());
      },
      error: (err) => {
        if (err.error.message === '⚠ Missing fields!') {
          this.missingFields = true;
        }
        console.log(`${err.statusText}: ${err.error}`);
      },
    });
  }
}
