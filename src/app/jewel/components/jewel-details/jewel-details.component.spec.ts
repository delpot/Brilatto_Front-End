import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JewelDetailsComponent } from './jewel-details.component';

describe('JewelDetailsComponent', () => {
  let component: JewelDetailsComponent;
  let fixture: ComponentFixture<JewelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JewelDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JewelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
