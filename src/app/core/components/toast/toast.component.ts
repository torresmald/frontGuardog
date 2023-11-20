import { Component } from '@angular/core';
import { ToastService } from '../../services/Toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  public shouldShowToast?: boolean;
  public message?: string;

  constructor(private toastService:ToastService) {}

  ngOnInit(): void {
    this.toastService.$shoulShowToast.subscribe((value) => {      
      this.shouldShowToast = value;      
    });
    this.toastService.$message?.subscribe((value) => {                  
      this.message = value;
    });
       
  }
  public isSuccessMessage(message?: string): boolean {
    if(message){
      const successMessages = ['Añadido con Éxito', 'Usuario confirmado', 'Token Valido', 'Hemos enviado un email con las instrucciones', 'Password modificado'];
      return successMessages.includes(message);
    }
    return false
  }
  
}
