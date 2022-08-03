import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelCategoryComponent } from './jewel-category.component';

describe('JewelCategoryComponent', () => {
  let component: JewelCategoryComponent;
  let fixture: ComponentFixture<JewelCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JewelCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JewelCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
