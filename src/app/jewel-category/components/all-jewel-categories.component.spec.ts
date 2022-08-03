import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJewelCategoriesComponent } from './all-jewel-categories.component';

describe('AllJewelCategoriesComponent', () => {
  let component: AllJewelCategoriesComponent;
  let fixture: ComponentFixture<AllJewelCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllJewelCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllJewelCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
