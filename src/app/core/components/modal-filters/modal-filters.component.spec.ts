import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltersComponent } from './modal-filters.component';

describe('ModalFiltersComponent', () => {
  let component: ModalFiltersComponent;
  let fixture: ComponentFixture<ModalFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFiltersComponent]
    });
    fixture = TestBed.createComponent(ModalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
