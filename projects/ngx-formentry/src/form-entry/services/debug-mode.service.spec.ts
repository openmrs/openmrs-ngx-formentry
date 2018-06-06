import { DebugModeService } from './debug-mode.service';
import { TestBed , async , inject} from '@angular/core/testing';
import { CookieService, CookieOptions, CookieOptionsProvider } from 'ngx-cookie';

describe('Service : Debug Mode Service', () => {

  beforeEach(() => {
   TestBed.configureTestingModule({

            providers: [
                DebugModeService,
                CookieService
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
