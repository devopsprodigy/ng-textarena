import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularTextarenaModule} from '../../projects/angular-textarena/src/lib/angular-textarena.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
