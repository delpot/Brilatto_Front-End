import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedJewelComponent } from './added-jewel.component';

describe('AddedJewelComponent', () => {
  let component: AddedJewelComponent;
  let fixture: ComponentFixture<AddedJewelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedJewelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddedJewelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
