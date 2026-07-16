import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { EndpointDataSource } from './endpoint-data-source';

describe('EndpointDataSource', () => {
  const endpointUrl = 'https://example.org/ws/rest/v1/provider';
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('maps a results-wrapped response to options via valueKey/labelKey', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    let result: any;
    ds.searchOptions('').subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        { uuid: '1', display: 'Dr One' },
        { uuid: '2', display: 'Dr Two' }
      ]
    });

    expect(
      result.map((o: any) => ({ value: o.value, label: o.label }))
    ).toEqual([
      { value: '1', label: 'Dr One' },
      { value: '2', label: 'Dr Two' }
    ]);
  });

  it('maps a bare-array response and honors custom keys', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      valueKey: 'id',
      labelKey: 'name'
    });
    let result: any;
    ds.searchOptions('').subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    req.flush([
      { id: 10, name: 'Alice' },
      { id: 20, name: 'Bob' }
    ]);

    expect(
      result.map((o: any) => ({ value: o.value, label: o.label }))
    ).toEqual([
      { value: 10, label: 'Alice' },
      { value: 20, label: 'Bob' }
    ]);
  });

  it('appends the search term and configured limit to the request', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      searchParam: 'q',
      limit: 50
    });
    ds.searchOptions('john').subscribe();

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    expect(req.request.params.get('q')).toBe('john');
    expect(req.request.params.get('limit')).toBe('50');
    req.flush({ results: [] });
  });

  it('bounds the initial (empty-term) load with the default limit', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    ds.searchOptions('').subscribe();

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    expect(req.request.params.has('q')).toBe(false);
    expect(req.request.params.get('limit')).toBe('20');
    req.flush({ results: [] });
  });

  it('falls back to the default limit for a non-numeric configured limit', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      limit: '' as any
    });
    ds.searchOptions('').subscribe();

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    expect(req.request.params.get('limit')).toBe('20');
    req.flush({ results: [] });
  });

  it('honors a numeric limit carried as a string in schema JSON', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      limit: '35' as any
    });
    ds.searchOptions('').subscribe();

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    expect(req.request.params.get('limit')).toBe('35');
    req.flush({ results: [] });
  });

  it('resolves a saved value to a single option (saved-value resolution)', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      valueKey: 'uuid',
      labelKey: 'display'
    });
    let result: any;
    ds.resolveSelectedValue('abc-123').subscribe((r) => (result = r));

    const req = httpMock.expectOne(`${endpointUrl}/abc-123`);
    expect(req.request.method).toBe('GET');
    req.flush({ uuid: 'abc-123', display: 'Dr Saved' });

    expect({ value: result.value, label: result.label }).toEqual({
      value: 'abc-123',
      label: 'Dr Saved'
    });
  });

  it('url-encodes the saved value in the default resolution path', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    ds.resolveSelectedValue('a/b c?d').subscribe();

    const req = httpMock.expectOne(`${endpointUrl}/a%2Fb%20c%3Fd`);
    req.flush({ uuid: 'a/b c?d', display: 'Odd Identifier' });
  });

  it('resolves through a configured resolveUrlTemplate', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      resolveUrlTemplate: 'https://example.org/lookup?id={value}'
    });
    let result: any;
    ds.resolveSelectedValue('abc-123').subscribe((r) => (result = r));

    const req = httpMock.expectOne('https://example.org/lookup?id=abc-123');
    req.flush({ uuid: 'abc-123', display: 'Dr Template' });

    expect(result.label).toBe('Dr Template');
  });

  it('replaces every {value} placeholder in a resolveUrlTemplate', () => {
    const ds = new EndpointDataSource(http, {
      endpointUrl,
      resolveUrlTemplate: 'https://example.org/lookup?id={value}&ref={value}'
    });
    ds.resolveSelectedValue('abc-123').subscribe();

    const req = httpMock.expectOne(
      'https://example.org/lookup?id=abc-123&ref=abc-123'
    );
    req.flush({ uuid: 'abc-123', display: 'Dr Twice' });
  });

  it('emits an empty option list for a successful empty response', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    let result: any;
    ds.searchOptions('nobody').subscribe((r) => (result = r));

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    req.flush({ results: [] });

    expect(result).toEqual([]);
  });

  it('propagates a failed search instead of converting it to empty results', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    let succeeded = false;
    let failed = false;
    ds.searchOptions('').subscribe({
      next: () => (succeeded = true),
      error: () => (failed = true)
    });

    const req = httpMock.expectOne((r) => r.url === endpointUrl);
    req.flush('boom', { status: 500, statusText: 'Server Error' });

    expect(succeeded).toBe(false);
    expect(failed).toBe(true);
  });

  it('propagates a failed saved-value resolution', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    let failed = false;
    ds.resolveSelectedValue('abc-123').subscribe({
      error: () => (failed = true)
    });

    const req = httpMock.expectOne(`${endpointUrl}/abc-123`);
    req.flush('boom', { status: 500, statusText: 'Server Error' });

    expect(failed).toBe(true);
  });

  it('resolves to undefined without a request for an empty saved value', () => {
    const ds = new EndpointDataSource(http, { endpointUrl });
    let called = false;
    let result: any = 'sentinel';
    ds.resolveSelectedValue('').subscribe((r) => {
      called = true;
      result = r;
    });

    expect(called).toBe(true);
    expect(result).toBeUndefined();
    httpMock.expectNone(() => true);
  });
});
