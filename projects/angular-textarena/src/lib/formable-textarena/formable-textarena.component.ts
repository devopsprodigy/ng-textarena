import {Component, OnInit, Input, ViewChild, ElementRef, forwardRef, Optional, Host, SkipSelf, OnChanges, SimpleChanges} from '@angular/core';
import Textarena, {TextarenaOptions, TextarenaData} from '@itsumma/textarena';
import {ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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
export class AngularTextarenaFormableComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() settings: TextarenaOptions | undefined;
  @Input() formControlName: string;
  @Input() disabled?: boolean;
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
    if (this.disabled !== undefined) {
      options.editable = !this.disabled;
    }
    const {value: initData} = this.controlContainer.control.get(this.formControlName);
    this.textArena = new Textarena(elem, {
      onChange: (e) => {
        this.updateValue(e);
      },
      initData,
      ...options,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled && this.disabled !== undefined && this.textArena) {
      this.textArena.setEditable(!this.disabled);
    }
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
      if (this.textArena.getData().dataHtml !== this.html.dataHtml){
        this.textArena.setData(this.html);
      }
      console.log(this.html);
    }
  }

  updateValue(insideValue: TextarenaData) {
    this.html = insideValue; // html
    this.onChange(insideValue); // уведомить Forms API
    this.onTouched();
  }
}
