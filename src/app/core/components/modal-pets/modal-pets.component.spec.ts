import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetsComponent } from './modal-pets.component';

describe('ModalPetsComponent', () => {
  let component: ModalPetsComponent;
  let fixture: ComponentFixture<ModalPetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPetsComponent]
    });
    fixture = TestBed.createComponent(ModalPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
