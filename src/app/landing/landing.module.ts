import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes = [
  {path: '', component: LandingComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
  ],
  declarations: [LandingComponent],
  exports: [RouterModule]
})
export class LandingModule {}
