import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicesViewComponent } from './modal-services-view.component';

describe('ModalItemsServicesComponent', () => {
  let component: ModalServicesViewComponent;
  let fixture: ComponentFixture<ModalServicesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalServicesViewComponent]
    });
    fixture = TestBed.createComponent(ModalServicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
