import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

interface TranslationData {
  [key: string]: string;
}

export class JsonLoader implements TranslateLoader {
  constructor() {}

  getTranslation(lang: string): Observable<TranslationData> {
    return of(require(`../../translations/${lang}.json`));
  }
}
