import { TestBed } from '@angular/core/testing';

import { AngularTextarenaService } from './angular-textarena.service';

describe('AngularTextarenaService', () => {
  let service: AngularTextarenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularTextarenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
