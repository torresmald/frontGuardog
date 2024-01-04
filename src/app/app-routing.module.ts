import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then((m) => m.RegisterModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then((m) => m.PrivacyModule)
  },
  {
    path: 'parent-view',
    loadChildren: () => import('./pages/parent-view/parent-view.module').then(m => m.ParentViewModule)
  },
  {
    path: 'trainer-view',
    loadChildren: () => import('./pages/trainer-view/trainer-view.module').then(m => m.TrainerViewModule)
  },
  {
    path: 'my-account/:id',
    loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: 'my-appointments/:id',
    loadChildren: () => import('./pages/my-appointments/my-appointments.module').then(m => m.MyAppointmentsModule)
  },
  {
    path: 'pet/:id',
    loadChildren: () => import('./pages/pet/pet.module').then(m => m.PetModule)
  },
  {
    path: 'appointment/:id',
    loadChildren: () => import('./pages/appointment/appointment.module').then(m => m.AppointmentModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'confirm-account/:token',
    loadChildren: () => import('./pages/confirm-account/confirm-account.module').then(m => m.ConfirmAccountModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: 'forgot-password/:token',
    loadChildren: () => import('./pages/update-password/update-password.module').then(m => m.UpdatePasswordModule)
  },

  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then((m) => m.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
