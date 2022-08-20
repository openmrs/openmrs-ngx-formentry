import { DebugModeService } from './debug-mode.service';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

describe('Service : Debug Mode Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebugModeService]
    });
  });

  it(
    'should construct Debug Mode Service',
    waitForAsync(
      inject([DebugModeService], (service, debugModeService) => {
        expect(service).toBeDefined();
      })
    )
  );

  it(
    'should have debugEnabled method defined',
    waitForAsync(
      inject([DebugModeService], (service, debugModeService) => {
        expect(service.debugEnabled()).toBeDefined();
      })
    )
  );
});
