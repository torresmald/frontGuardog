import { Component, HostBinding, Input } from "@angular/core";

@Component({
    selector: 'app-button',
    styleUrls: ['./button.component.scss'],
    templateUrl: './button.component.html'
})
export class Button {
   @Input() buttonName?: string
   @Input() buttonClass?: string
}