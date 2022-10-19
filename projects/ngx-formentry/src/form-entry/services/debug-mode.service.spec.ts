import { DebugModeService } from './debug-mode.service';
import { TestBed, waitForAsync } from '@angular/core/testing';

describe('Service: Debug Mode Service', () => {
  let debugModeService: DebugModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebugModeService]
    });

    debugModeService = TestBed.inject(DebugModeService);
  });

  it(
    'should construct Debug Mode Service',
    waitForAsync(() => {
      expect(debugModeService).toBeDefined();
    })
  );

  it(
    'should have debugEnabled method defined',
    waitForAsync(() => {
      expect(debugModeService.debugEnabled()).toBeDefined();
    })
  );
});
