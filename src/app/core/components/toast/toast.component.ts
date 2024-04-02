import { Component } from '@angular/core';
import { ToastService } from '../../services/Toast/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: []
})
export class ToastComponent {
  public shouldShowToast?: Observable<boolean>;
  public message?: string;

  constructor(private toastService:ToastService) {}

  ngOnInit(): void {
    this.shouldShowToast = this.toastService.$shoulShowToast
    this.toastService.$message?.subscribe((value) => {                  
      this.message = value;
    });
       
  }
  public isSuccessMessage(message?: string): boolean {
    if(message){
      const successMessages = ['Añadido con Éxito', 'Usuario confirmado', 'Token Valido', 'Hemos enviado un email con las instrucciones', 'Password modificado', 'Cupon Aplicado'];
      return successMessages.includes(message);
    }
    return false
  }
  
}
