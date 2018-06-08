import { DebugModeService } from './debug-mode.service';
import { TestBed , async , inject} from '@angular/core/testing';

describe('Service : Debug Mode Service', () => {

  beforeEach(() => {
   TestBed.configureTestingModule({

            providers: [
                DebugModeService
                ]

           });

  });


  it('should construct Debug Mode Service', async(inject(
                 [DebugModeService], (service, debugModeService) => {
                 expect(service).toBeDefined();
    })));

  it('should have debugEnabled method defined', async(inject(
                 [DebugModeService], (service, debugModeService) => {
                 expect(service.debugEnabled()).toBeDefined();
    })));


});
