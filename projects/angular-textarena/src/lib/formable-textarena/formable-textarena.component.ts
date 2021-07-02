import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, forwardRef} from '@angular/core';
import Textarena from '@itsumma/textarena';
import TextarenaOptions from '@itsumma/textarena/lib/interfaces/TextarenaOptions';
import TextarenaData from '@itsumma/textarena/lib/interfaces/TextarenaData';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
  @Input() settings: TextarenaOptions = {};
  @ViewChild('textArenaContainer', {static: true}) textArenaContainer: ElementRef;
  private html: TextarenaData;
  onChange = (value: any) => {};
  onTouched = () => {};
  constructor(private taService: AngularTextarenaService) {}

  ngOnInit(): void {
    const elem = this.textArenaContainer.nativeElement;
    const options = this.taService.createOptions(this.settings);
    const textArena = new Textarena(elem, {
      onChange: (e) => {
        this.updateValue(e);
      },
      onReady: (e) => {
        setTimeout(() => {
          this.updateValue(e);
        }, 0);
      },
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
      console.log(this.html);
    }
  }

  updateValue(insideValue: TextarenaData) {
    this.html = insideValue; // html
    this.onChange(insideValue); // уведомить Forms API
    this.onTouched();
  }
}
