import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public phonePattern: string ='^34\s?(?:6[0-9]|7[1-9])[0-9]\s?[0-9]{3}\s?[0-9]{3}$'

  constructor() {}

  public isValidField(form: FormGroup, field: string) {
    return form?.controls[field].errors && form.controls[field].touched;
  }

  public getFieldError(form: FormGroup, field: string, messageType: string) {
    if (!form?.controls[field]) return '';

    const errors = form.controls[field].errors || {};

    if ('required' in errors) {
      return `${messageType}.${field}.Required`;
    }
    if ('email' in errors) {
      return `${messageType}.${field}.Invalid`;
    }
    if ('minlength' in errors) {
      return `${messageType}.${field}.Short`;
    }
    if ('pattern' in errors) {
      return `${messageType}.${field}.Pattern`;
    }
    if ('noCoincidence' in errors) {
      return `${messageType}.${field}.NoCoincidence`;
    }

    return '';
  }

  public isSamePassword(password1: string, password2: string){
    return (form: AbstractControl): ValidationErrors | null => {
      const passwordValue1 = form.get(password1)?.value
      const passwordValue2 = form.get(password2)?.value

      if(passwordValue1 !== passwordValue2){
        form.get(password2)?.setErrors({noCoincidence: true})
        return {
          noCoincidence: true
        }
      }
      form.get(password2)?.setErrors(null)
      return null

    }
  }
}
