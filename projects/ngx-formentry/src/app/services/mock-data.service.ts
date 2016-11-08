import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class MockDataService {

    constructor() { }
    getProviders() {
        let providers = [{
            id: 'Emmannuel',
            value: 'Emmanuel'
        }];
        return Observable.from(providers);

    }
}
