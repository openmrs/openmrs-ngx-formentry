import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AfeFormControl } from '../../public_api';
import { AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension';
export declare class FormErrorsService {
    static control: AfeFormControl | AfeFormArray | AfeFormGroup;
    static tab: number;
    announceErrorFieldSource: Subject<string>;
    announceErrorField$: Observable<any>;
    announceErrorField(error: string): void;
}
