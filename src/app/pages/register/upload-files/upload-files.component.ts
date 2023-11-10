import { Component, Input, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFilesComponent),
      multi: true,
    }
  ]
})
export class UploadFilesComponent implements ControlValueAccessor {
  public files: any = [];
  @Input() formControl?: FormControl
  
  private onChange: Function | undefined;
  private onTouch: Function | undefined;

  public uploadFile(event: any) {    
    if (event[0]) {      
      for (let index = 0; index < event.length; index++) {
        const element = event[index];
        this.files.push(element.name);
      }
    } else {
      for (let index = 0; index < event.target.files.length; index++) {
        const element = event.target.files[index];
        this.files.push(element.name);
      }
    }
    console.log(this.files);
  }
  public deleteAttachment(index: any) {
    this.files.splice(index, 1);
  }


  writeValue(files: any): void {
    // console.log();
    
    // this.files = files;
  }

  registerOnChange(fn: Function): void {
    // this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    // this.onTouch = fn;
  }
}







  

