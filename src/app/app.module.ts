import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppMaterialModule } from './app.material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ServiceWorkerModule } from '@angular/service-worker';
import { JournalComponent } from './journal/journal.component';
import { PlantLocationAddComponent } from './plant-location-add/plant-location-add.component';
import { SelectFromMapComponent } from './select-from-map/select-from-map.component';
import { FormlySelectFromMap } from './formly-select-from-map-input';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignUpComponent,
    MapComponent,
    JournalComponent,
    PlantLocationAddComponent,
    SelectFromMapComponent,
    FormlySelectFromMap
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    FormlyModule.forRoot({
      types: [
        {name: 'select-from-map-input', component: FormlySelectFromMap, wrappers: ['form-field']},
      ],
      validators: [
        {name: 'email', validation: Validators.email}
      ],
      validationMessages: [
        {name: 'email', message: 'Cet email n\'est pas valide'},
        {name: 'required', message: 'Ce champ est requis'},
      ],
    }),
    FormlyMaterialModule,
    LeafletModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
