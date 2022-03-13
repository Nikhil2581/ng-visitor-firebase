import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnavComponent } from './vnav.component';

describe('VnavComponent', () => {
  let component: VnavComponent;
  let fixture: ComponentFixture<VnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
