import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { JournalComponent } from './journal/journal.component';
import { PlantLocationAddComponent } from './plant-location-add/plant-location-add.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HasRoleGuard } from './has-role.guard';
import { PlantLocationComponent } from './plant-location/plant-location.component';
import { PlantsComponent } from './plants/plants.component';
import { PlantAddComponent } from './plant-add/plant-add.component';
import { PlantComponent } from './plant/plant.component';

const redirectLoggedInToLanding = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: '',
        component: JournalComponent
      },
      {
        path: 'plant-locations',
        children: [
          {
            path: 'add',
            component: PlantLocationAddComponent,
            canActivate: [HasRoleGuard],
            data: {allowedRoles: ['roles/admin']}
          },
          {
            path: ':id',
            component: PlantLocationComponent
          }
        ]
      },
      {
        path: 'plants',
        children: [
          {
            path: '',
            component: PlantsComponent
          },
          {
            path: 'add',
            component: PlantAddComponent,
            canActivate: [HasRoleGuard],
            data: {allowedRoles: ['roles/member', 'roles/admin']}
          },
          {
            path: ':id',
            component: PlantComponent
          }
        ]
      }
    ]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToLanding}
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectLoggedInToLanding}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
