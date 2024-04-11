import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public isValidField(form: FormGroup, field: string){
    return form?.controls[field].errors && form.controls[field].touched
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
  
    return '';
  }
  

}
