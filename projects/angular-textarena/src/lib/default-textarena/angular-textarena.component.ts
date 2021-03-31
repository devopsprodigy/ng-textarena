import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import Textarena from 'textarena';
import TextarenaOptions from 'textarena/lib/interfaces/TextarenaOptions';
import TextarenaData from 'textarena/lib/interfaces/TextarenaData';
import dataHtml from '../default/dataHtml';
import {AngularTextarenaService} from '../angular-textarena.service';
@Component({
  selector: 'ng-textarena',
  template: ' <div id="txt-container" #textArenaContainer></div> ',
  styles: [
    `
      #txt-container {
        display: flex;
      }
    `,
  ],
})
export class AngularTextarenaComponent implements OnInit {
  @Input() settings: TextarenaOptions = {};
  @Output() export = new EventEmitter<TextarenaData>();
  @Output() ready = new EventEmitter<TextarenaData>();
  @ViewChild('textArenaContainer', {static: true}) textArenaContainer: ElementRef;
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
