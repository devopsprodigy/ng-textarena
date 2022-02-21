import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Textarena, { TextarenaOptions, TextarenaData } from '@itsumma/textarena';
import { AngularTextarenaService } from '../angular-textarena.service';

@Component({
  selector: 'ng-textarena',
  template: ' <div #textArenaContainer></div> ',
  styles: [
    `
    `,
  ],
})
export class AngularTextarenaComponent implements OnInit {
  @Input() settings: TextarenaOptions = {};
  @Output() export = new EventEmitter<TextarenaData>();
  @Output() ready = new EventEmitter<TextarenaData>();
  @ViewChild('textArenaContainer', { static: true })
  textArenaContainer: ElementRef;
  constructor(private taService: AngularTextarenaService) {}

  ngOnInit(): void {
    const elem = this.textArenaContainer.nativeElement;
    const options = this.taService.createOptions(this.settings);
    const textArena = new Textarena(elem, {
      onChange: (e) => {
        this.export.emit(e);
      },
      onReady: (e) => {
        this.ready.emit(e);
      },
      ...options,
    });
  }
}
