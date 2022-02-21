import { Injectable } from '@angular/core';
import { defaultOptions, TextarenaOptions } from '@itsumma/textarena';

@Injectable({
  providedIn: 'root'
})
export class AngularTextarenaService {

  constructor() { }

  createOptions(settings: TextarenaOptions): TextarenaOptions | undefined {
    return { ...defaultOptions, ...(settings || {})};
  }
}
