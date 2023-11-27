import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemsServicesComponent } from './modal-items-services.component';

describe('ModalItemsServicesComponent', () => {
  let component: ModalItemsServicesComponent;
  let fixture: ComponentFixture<ModalItemsServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalItemsServicesComponent]
    });
    fixture = TestBed.createComponent(ModalItemsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
