import { Injectable } from '@angular/core';
import { defaultOptions } from '@itsumma/textarena';
import TextarenaOptions from '@itsumma/textarena/lib/interfaces/TextarenaOptions';

@Injectable({
  providedIn: 'root'
})
export class AngularTextarenaService {

  constructor() { }

  createOptions(settings: TextarenaOptions): TextarenaOptions | undefined {
    return { ...defaultOptions, ...(settings || {})};
  }
}
