import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

import { FormEntryModule } from '../form-entry.module';
import { FormRendererComponent } from '../form-renderer/form-renderer.component';
import { DataSources } from './data-sources';
import { EndpointDataSource } from './endpoint-data-source';

// Contract-preservation tests for registering the built-in endpoint data source:
// existing consumers must be unaffected whether or not they provide HttpClient,
// and host-registered data sources must keep precedence.
describe('FormEntryModule endpoint data source registration', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('registers the endpoint data source when HttpClient is provided', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    TestBed.inject(FormEntryModule);
    const dataSources = TestBed.inject(DataSources);

    expect(
      dataSources.dataSources['endpoint'] instanceof EndpointDataSource
    ).toBe(true);
  });

  it('constructs without HttpClient exactly as before (no hard dependency)', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()]
    });

    expect(() => TestBed.inject(FormEntryModule)).not.toThrow();
    const dataSources = TestBed.inject(DataSources);
    expect(dataSources.dataSources['endpoint']).toBeUndefined();
  });

  it('creates the form renderer without an HTTP provider', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()]
    });

    expect(() => TestBed.createComponent(FormRendererComponent)).not.toThrow();
  });

  it('does not disturb data sources a host has already registered', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    TestBed.inject(FormEntryModule);
    const dataSources = TestBed.inject(DataSources);
    const hostProvider = { searchOptions: () => null };
    dataSources.registerDataSource('provider', hostProvider);

    expect(dataSources.dataSources['provider']).toBe(hostProvider);
    expect(
      dataSources.dataSources['endpoint'] instanceof EndpointDataSource
    ).toBe(true);
  });

  it('defers to a data source a host registered before module construction', () => {
    const dataSources = new DataSources();
    const hostEndpoint: any = { searchOptions: () => null };
    dataSources.registerDataSource('endpoint', hostEndpoint);

    new FormEntryModule(dataSources, {} as any);

    expect(dataSources.dataSources['endpoint']).toBe(hostEndpoint);
  });

  it('lets a host override the endpoint data source by re-registering the name', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    TestBed.inject(FormEntryModule);
    const dataSources = TestBed.inject(DataSources);
    const hostEndpoint = { searchOptions: () => null };
    dataSources.registerDataSource('endpoint', hostEndpoint);

    expect(dataSources.dataSources['endpoint']).toBe(hostEndpoint);
  });
});

// Render-time lookup: the endpoint data source self-heals and failed lookups warn.
describe('FormRendererComponent data source resolution', () => {
  const remoteSelectNode = (dataSource: string): any => ({
    question: {
      renderingType: 'remote-select',
      extras: {},
      dataSource,
      key: 'doctor'
    }
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  function setUpWithHttp(): DataSources {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    TestBed.inject(FormEntryModule);
    return TestBed.inject(DataSources);
  }

  it('re-registers the built-in endpoint data source after a host clears it', () => {
    const dataSources = setUpWithHttp();
    dataSources.clearDataSource('endpoint');
    expect(dataSources.dataSources['endpoint']).toBeUndefined();

    const component = TestBed.createComponent(FormRendererComponent)
      .componentInstance;
    component.node = remoteSelectNode('endpoint');
    component.setUpRemoteSelect();

    expect(component.dataSource instanceof EndpointDataSource).toBe(true);
    expect(
      dataSources.dataSources['endpoint'] instanceof EndpointDataSource
    ).toBe(true);
  });

  it('does not self-heal the endpoint data source without HttpClient', () => {
    TestBed.configureTestingModule({
      imports: [FormEntryModule, TranslateModule.forRoot()]
    });
    TestBed.inject(FormEntryModule);
    const dataSources = TestBed.inject(DataSources);
    const warnSpy = spyOn(console, 'warn');

    const component = TestBed.createComponent(FormRendererComponent)
      .componentInstance;
    component.node = remoteSelectNode('endpoint');
    component.setUpRemoteSelect();

    expect(component.dataSource).toBeUndefined();
    expect(dataSources.dataSources['endpoint']).toBeUndefined();
    const message = warnSpy.calls.mostRecent().args[0] as string;
    expect(message).toContain('Available data sources: (none)');
  });

  it('warns with the available names when a data source is missing', () => {
    setUpWithHttp();
    const warnSpy = spyOn(console, 'warn');

    const component = TestBed.createComponent(FormRendererComponent)
      .componentInstance;
    component.node = remoteSelectNode('providerz');
    component.setUpRemoteSelect();

    expect(component.dataSource).toBeUndefined();
    const message = warnSpy.calls.mostRecent().args[0] as string;
    expect(message).toContain(
      "Data source 'providerz' required by question 'doctor' is unavailable at render time"
    );
    expect(message).toContain('Available data sources: endpoint');
  });
});
