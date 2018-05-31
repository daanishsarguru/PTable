import { TestBed, inject } from '@angular/core/testing';

import { ServerCallerService } from './server-caller.service';

describe('ServerCallerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerCallerService]
    });
  });

  it('should be created', inject([ServerCallerService], (service: ServerCallerService) => {
    expect(service).toBeTruthy();
  }));
});
