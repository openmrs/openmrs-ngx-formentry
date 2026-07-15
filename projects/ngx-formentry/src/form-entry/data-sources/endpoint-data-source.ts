import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { DataSource } from '../question-models/interfaces/data-source';
import { Option } from '../question-models/select-option';

/**
 * Schema-configurable options for an {@link EndpointDataSource}. These come from a
 * question's `questionOptions.renderingOptions` (or `questionOptions.dataSourceOptions`)
 * and are mapped onto the question by `QuestionFactory.toCustomApiQuestion`.
 */
export interface EndpointDataSourceOptions {
  /** REST endpoint returning the list of items to choose from. */
  endpointUrl: string;
  /** Property on each item used as the stored value. Defaults to `uuid`. */
  valueKey?: string;
  /** Property on each item used as the display label. Defaults to `display`. */
  labelKey?: string;
  /** Query parameter used to pass the search term. Defaults to `q`. */
  searchParam?: string;
  /** Property on the response body holding the array of items. Defaults to `results`. */
  resultsKey?: string;
  /** Query parameter used for the page size. Defaults to `limit`. */
  limitParam?: string;
  /** Page size. Only sent when defined. */
  limit?: number;
  /** Allows extra, endpoint-specific options and keeps the shape assignable to the
   * `Record<string, unknown>` used by the DataSource contract. */
  [key: string]: unknown;
}

interface ResolvedConfig {
  endpointUrl: string;
  valueKey: string;
  labelKey: string;
  searchParam: string;
  resultsKey: string;
  limitParam: string;
  limit?: number;
}

/**
 * A reusable, inbuilt {@link DataSource} that reads its list of options from an arbitrary
 * REST endpoint declared in the form schema. Unlike the OpenMRS-specific data sources that a
 * consuming app registers by name, this one is instantiated per-question from schema config,
 * which lets it be rendered through the existing `ofe-remote-select` component — gaining
 * search, paging and saved-value resolution without duplicating any control logic.
 */
export class EndpointDataSource implements DataSource {
  public dataSourceOptions: EndpointDataSourceOptions;

  constructor(private http: HttpClient, options: EndpointDataSourceOptions) {
    this.dataSourceOptions = options ?? ({} as EndpointDataSourceOptions);
  }

  /**
   * Searches the endpoint. Called with an empty term for the initial load and with the typed
   * term on subsequent typeahead events. Paging is expressed via the `limit` option so large
   * directories return one page at a time rather than everything at once.
   */
  public searchOptions(
    searchText: string,
    dataSourceOptions?: Record<string, unknown>
  ): Observable<Option[]> {
    const config = this.resolveConfig(dataSourceOptions);
    if (!config.endpointUrl) {
      return of([]);
    }

    let params = new HttpParams();
    if (searchText) {
      params = params.set(config.searchParam, searchText);
    }
    if (typeof config.limit === 'number') {
      params = params.set(config.limitParam, String(config.limit));
    }

    return this.http.get(config.endpointUrl, { params }).pipe(
      map((response: any) => {
        const items = this.extractArray(response, config.resultsKey);
        return items.map((item) => this.toOption(item, config));
      }),
      catchError((error) => {
        console.error('EndpointDataSource: failed to load options', error);
        return of([]);
      })
    );
  }

  /**
   * Resolves a stored value (e.g. a saved uuid) back into a displayable option so that
   * prepopulated/edited forms show the previously selected item.
   */
  public resolveSelectedValue(
    value: any,
    dataSourceOptions?: Record<string, unknown>
  ): Observable<Option> {
    const config = this.resolveConfig(dataSourceOptions);
    if (
      !config.endpointUrl ||
      value === undefined ||
      value === null ||
      value === ''
    ) {
      return of((undefined as unknown) as Option);
    }

    const url = `${this.trimTrailingSlash(config.endpointUrl)}/${value}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Endpoints may return the item directly, wrapped under a results key, or as an array.
        const items = this.extractArray(response, config.resultsKey);
        const item = items.length ? items[0] : response;
        return (item ? this.toOption(item, config) : undefined) as Option;
      }),
      catchError((error) => {
        console.error('EndpointDataSource: failed to resolve value', error);
        return of((undefined as unknown) as Option);
      })
    );
  }

  // The DataSource interface requires these; they are not applicable to a dropdown endpoint.
  public fileUpload(): Observable<any> {
    return of(null);
  }

  public fetchFile(): Observable<any> {
    return of(null);
  }

  private resolveConfig(override?: Record<string, unknown>): ResolvedConfig {
    const merged = {
      ...this.dataSourceOptions,
      ...(override ?? {})
    } as EndpointDataSourceOptions;

    return {
      endpointUrl: merged.endpointUrl,
      valueKey: merged.valueKey ?? 'uuid',
      labelKey: merged.labelKey ?? 'display',
      searchParam: merged.searchParam ?? 'q',
      resultsKey: merged.resultsKey ?? 'results',
      limitParam: merged.limitParam ?? 'limit',
      limit: merged.limit
    };
  }

  private extractArray(response: any, resultsKey: string): any[] {
    if (!response) {
      return [];
    }
    if (Array.isArray(response)) {
      return response;
    }
    if (Array.isArray(response[resultsKey])) {
      return response[resultsKey];
    }
    return [];
  }

  private toOption(
    item: any,
    config: { valueKey: string; labelKey: string }
  ): Option {
    return new Option({
      value: item?.[config.valueKey],
      label: item?.[config.labelKey]
    });
  }

  private trimTrailingSlash(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }
}
