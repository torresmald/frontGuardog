import { CanDeactivateFn } from '@angular/router'
import { DeactivatableComponent } from './deactivate.interface'

export const canDeactivateFormComponent: CanDeactivateFn<DeactivatableComponent> = (component: DeactivatableComponent) => {
    if (component.canDeactivate) {
        return component.canDeactivate()
    }
    return true
}
