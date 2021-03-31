import {NgModule} from '@angular/core';
import { AngularTextarenaComponent } from './default-textarena/angular-textarena.component';
import {AngularTextarenaFormableComponent} from './formable-textarena/formable-textarena.component'


@NgModule({
  declarations: [
    AngularTextarenaComponent,
    AngularTextarenaFormableComponent],
  imports: [
  ],
  exports: [
    AngularTextarenaComponent,
    AngularTextarenaFormableComponent]
})
export class AngularTextarenaModule { }
