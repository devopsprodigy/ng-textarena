import { Injectable } from '@angular/core';
import { defaultOptions } from '@itsumma/textarena';
import TextarenaOptions from '@itsumma/textarena/lib/interfaces/TextarenaOptions';
import dataHtml from './default/dataHtml';

@Injectable({
  providedIn: 'root'
})
export class AngularTextarenaService {

  constructor() { }

  createOptions(settings: TextarenaOptions): TextarenaOptions | undefined {
    if (!settings) {
      return defaultOptions;
    }
    const obj: TextarenaOptions = {};
    obj.initData = settings?.initData || {dataHtml};
    obj.debug = settings?.debug || false;
    obj.editable = settings?.editable || true;
    if (settings?.plugins?.length){
      obj.plugins = settings.plugins;
    }
    obj.creatorBar = settings?.creatorBar || undefined;
    obj.toolbar = settings?.toolbar || undefined;
    return obj;
  }
}
