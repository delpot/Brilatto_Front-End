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

  constructor(
    private jewelService: JewelService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.jewelDto = {
      modelId: '',
      color: '',
      photo: '',
      quantityInStock: 0,
      price: 0,
    }
    this.jewelForm = this.formBuilder.group({
      modelId: [null, Validators.required],
      color: [null, Validators.required],
      photo:  [null, Validators.required],
      quantityInStock: [null, Validators.required],
      price: [null, Validators.required],
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
          const imagePath = `./assets/img/${jewel.photo}`;
          jewel.photo = imagePath;
        }
      },
      error: (err) => {
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

  onSubmit(): void {
    this.jewelDto.modelId = this.modelId;
    this.jewelDto.color = this.jewelForm.controls['color'].value;
    this.jewelDto.photo = this.jewelForm.controls['photo'].value;
    this.jewelDto.quantityInStock = this.jewelForm.controls['quantityInStock'].value;
    this.jewelDto.price = this.jewelForm.controls['price'].value;

    this.jewelService
    .addOneJewel(this.jewelDto)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert(`Nouveau bijou ${res.color} ajouté!`);
        this.router
        .navigate(['/model/'+ this.modelId])
        .then(() => window.location.reload());
      },
      error: (err) => {
        console.log(err)
        console.log(`${err.statusText}: ${err.error}`);
      }
    });
  }

}
