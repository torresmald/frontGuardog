import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStripeComponent } from './modal-stripe.component';

describe('ModalStripeComponent', () => {
  let component: ModalStripeComponent;
  let fixture: ComponentFixture<ModalStripeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalStripeComponent]
    });
    fixture = TestBed.createComponent(ModalStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
