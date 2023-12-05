import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCouponsComponent } from './modal-coupons.component';

describe('ModalCouponsComponent', () => {
  let component: ModalCouponsComponent;
  let fixture: ComponentFixture<ModalCouponsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCouponsComponent]
    });
    fixture = TestBed.createComponent(ModalCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
