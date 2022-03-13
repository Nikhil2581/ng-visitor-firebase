import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HnavComponent } from './hnav.component';

describe('HnavComponent', () => {
  let component: HnavComponent;
  let fixture: ComponentFixture<HnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
