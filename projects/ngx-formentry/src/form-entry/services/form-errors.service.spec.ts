import { TestBed } from '@angular/core/testing';
import { FormErrorsService } from './form-errors.service';

describe('Form Errors Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FormErrorsService,
          useFactory: () => {
            return new FormErrorsService();
          }
        }
      ]
    });
  });

  it('should be defined', () => {
    const service: FormErrorsService = TestBed.get(FormErrorsService);
    expect(service).toBeTruthy();
  });

  it('should announce error field', () => {
    const service: FormErrorsService = TestBed.get(FormErrorsService);
    service.announceErrorField$.subscribe((error) => {
      const tab: number = +error.split(',')[0];
      const el = error.split(',')[1];
      expect(tab).toBe(0);
      expect(el).toBe('test');
    });

    service.announceErrorField('0,test');
  });
});
