import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, forwardRef, Optional, Host, SkipSelf} from '@angular/core';
import Textarena from '@itsumma/textarena';
import TextarenaOptions from '@itsumma/textarena/lib/interfaces/TextarenaOptions';
import TextarenaData from '@itsumma/textarena/lib/interfaces/TextarenaData';
import {AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AngularTextarenaService} from '../angular-textarena.service';
@Component({
  selector: 'ng-textarena-formable',
  template: ' <div #textArenaContainer></div> ',
  styles: [
    `
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AngularTextarenaFormableComponent),
      multi: true,
    },
  ],
})
export class AngularTextarenaFormableComponent implements OnInit, ControlValueAccessor {
  @Input() settings: TextarenaOptions | undefined;
  @Input() formControlName: string;
  @ViewChild('textArenaContainer', {static: true}) textArenaContainer: ElementRef;
  private html: TextarenaData;
  private textArena;

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(
      private taService: AngularTextarenaService,
      @Optional() @Host() @SkipSelf()
      private controlContainer: ControlContainer
  ) {}

  ngOnInit(): void {
    const elem = this.textArenaContainer.nativeElement;
    const options = this.taService.createOptions(this.settings);
    const {value: initData} = this.controlContainer.control.get(this.formControlName);
    this.textArena = new Textarena(elem, {
      onChange: (e) => {
        this.updateValue(e);
      },
      initData,
      ...options,
    });
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  writeValue(_value: TextarenaData) {
    if (_value) {
      this.html = _value;
    }
  }

  updateValue(insideValue: TextarenaData) {
    this.html = insideValue; // html
    this.onChange(insideValue); // уведомить Forms API
    this.onTouched();
  }
}
