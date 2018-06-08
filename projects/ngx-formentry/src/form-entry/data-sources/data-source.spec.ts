import { TestBed } from '@angular/core/testing';

import { DataSources } from './data-sources';

describe('Data sources object:', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });
    });

    it('should register data source ', () => {
        const ds = new DataSources();
        const encData: any = {
            encounterDate: new Date()
        };
        ds.registerDataSource('encData', encData);
        expect(ds.dataSources['encData']).toBe(encData);
    });

    it('should register data source by unwrapping source ', () => {
        const ds = new DataSources();
        const encData: any = {
            encounterDate: '01-01-0000',
            getArvRegimen: () => {
                return 20;
            }
        };
        ds.registerDataSource('encData', encData, true);
        expect(ds.dataSources['encounterDate']).toBe('01-01-0000');
        expect(ds.dataSources['getArvRegimen']()).toBe(20);
    });

    it('should clear data source ', () => {
        const ds = new DataSources();
        const encData: any = {
            encounterDate: new Date()
        };
        ds.registerDataSource('encData', encData);
        expect(ds.dataSources['encData']).toBe(encData);
        ds.clearDataSource('encData');
        expect(ds.dataSources['encData']).toBeFalsy();
    });
});

