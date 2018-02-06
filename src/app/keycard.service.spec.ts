import { TestBed, inject } from '@angular/core/testing';

import { KeycardService } from './keycard.service';

describe('KeycardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeycardService]
    });
  });

  it('should be created', inject([KeycardService], (service: KeycardService) => {
    expect(service).toBeTruthy();
  }));
});
