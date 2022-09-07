import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Jewel, JewelForm } from '../../jewel.interface';
import { JewelService } from '../../jewel.service';

@Component({
  selector: 'app-jewels-list',
  templateUrl: './jewels-list.component.html',
  styleUrls: ['./jewels-list.component.css']
})
export class JewelsListComponent implements OnInit {

  modelId: string = '';
  jewels: Jewel[] = [];
  jewelDto: JewelForm;
  jewelForm: FormGroup;
  isAdmin: boolean = false;
  missingFields: boolean = false;

  constructor(
    private jewelService: JewelService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.jewelDto = {
      modelId: '',
      name: '',
      photo1: '',
      photo2: '',
      quantityInStock: 0,
      price: 0,
      description: '',
    }
    this.jewelForm = this.formBuilder.group({
      modelId: [null, Validators.required],
      name: [null, Validators.required],
      photo1:  [null, Validators.required],
      photo2:  [null, Validators.required],
      quantityInStock: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      });
    this.isAdmin = (this.authService.tokenPayload) ? this.authService.tokenPayload.isAdmin : false;
  }

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
        for (const jewel of this.jewels) {
          const imagePath1 = `./assets/photos/jewels/${jewel.photo1}`;
          jewel.photo1 = imagePath1;
          const imagePath2 = `./assets/photos/jewels/${jewel.photo2}`;
          jewel.photo2 = imagePath2;
        }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

  onSubmit(): void {
    this.jewelDto.modelId = this.modelId;
    this.jewelDto.name = this.jewelForm.controls['name'].value;
    this.jewelDto.photo1 = this.jewelForm.controls['photo1'].value;
    this.jewelDto.photo2 = this.jewelForm.controls['photo2'].value;
    this.jewelDto.quantityInStock = this.jewelForm.controls['quantityInStock'].value;
    this.jewelDto.price = this.jewelForm.controls['price'].value;
    this.jewelDto.description = this.jewelForm.controls['description'].value;

    this.missingFields = false;

    this.jewelService
    .addOneJewel(this.jewelDto)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert(`Nouveau bijou ${res.name} ajouté!`);
        this.router
        .navigate(['/model/'+ this.modelId])
        .then(() => window.location.reload());
      },
      error: (err) => {
        if (err.error.message === '⚠ Missing fields!') {
          this.missingFields = true;
        }
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

}
