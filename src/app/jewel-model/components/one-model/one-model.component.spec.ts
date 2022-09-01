import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneModelComponent } from './one-model.component';

describe('OneModelComponent', () => {
  let component: OneModelComponent;
  let fixture: ComponentFixture<OneModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
