import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { LandingComponent } from './landing/landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignUpComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    FormlyModule.forRoot({
      validators: [
        {name: 'email', validation: Validators.email}
      ],
      validationMessages: [
        {name: 'email', message: 'Cet email n\'est pas valide'},
        {name: 'required', message: 'Ce champ est requis'},
      ],
    }),
    FormlyMaterialModule,
    MatSidenavModule,
    MatIconModule,
    LeafletModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
