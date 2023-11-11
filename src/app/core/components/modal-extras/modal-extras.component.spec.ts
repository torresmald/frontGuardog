import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExtrasComponent } from './modal-extras.component';

describe('ModalExtrasComponent', () => {
  let component: ModalExtrasComponent;
  let fixture: ComponentFixture<ModalExtrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExtrasComponent]
    });
    fixture = TestBed.createComponent(ModalExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
