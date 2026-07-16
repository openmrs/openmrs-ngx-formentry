import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataSource } from '../question-models/interfaces/data-source';
import { Option } from '../question-models/select-option';

const DEFAULT_LIMIT = 20;

/**
 * Schema-configurable options for an {@link EndpointDataSource}. These come from a
 * question's `questionOptions.datasource.config` and reach the data source through the
 * per-control dataSourceOptions that remote-select passes with every call.
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
  /** Page size. Defaults to 20 so the initial load stays bounded. */
  limit?: number;
  /** Template used to resolve a saved value, with a `{value}` placeholder. Defaults to
   * `{endpointUrl}/{value}`. */
  resolveUrlTemplate?: string;
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
  limit: number;
  resolveUrlTemplate?: string;
}

/**
 * A built-in {@link DataSource} that reads its list of options from a REST endpoint
 * declared in the form schema. Registered by FormEntryModule under the name 'endpoint',
 * so a question can use it via the standard schema contract with no host-app code:
 *
 *   "rendering": "remote-select",
 *   "datasource": { "name": "endpoint", "config": { "endpointUrl": "..." } }
 *
 * Request failures are propagated, not converted into empty results, so the control can
 * distinguish an unreachable endpoint from a successful search with no matches.
 */
export class EndpointDataSource implements DataSource {
  public dataSourceOptions: EndpointDataSourceOptions;

  constructor(private http: HttpClient, options?: EndpointDataSourceOptions) {
    this.dataSourceOptions = options ?? ({} as EndpointDataSourceOptions);
  }

  /**
   * Searches the endpoint. Called with an empty term for the initial load and with the
   * typed term on subsequent typeahead events. The request always carries a limit so a
   * generic endpoint never returns its complete collection.
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
    params = params.set(config.limitParam, String(config.limit));

    return this.http.get(config.endpointUrl, { params }).pipe(
      map((response: any) => {
        const items = this.extractArray(response, config.resultsKey);
        return items.map((item) => this.toOption(item, config));
      })
    );
  }

  /**
   * Resolves a stored value (e.g. a saved uuid) back into a displayable option so that
   * prepopulated/edited forms show the previously selected item. Uses
   * `{endpointUrl}/{urlEncodedValue}` unless the config supplies a resolveUrlTemplate.
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

    const encodedValue = encodeURIComponent(String(value));
    const url = config.resolveUrlTemplate
      ? config.resolveUrlTemplate.split('{value}').join(encodedValue)
      : `${this.trimTrailingSlash(config.endpointUrl)}/${encodedValue}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        // Endpoints may return the item directly, wrapped under a results key,
        // or as an array. An empty collection means the value did not resolve;
        // it must not be mistaken for the item itself.
        const items = this.extractArray(response, config.resultsKey);
        if (items.length) {
          return this.toOption(items[0], config);
        }
        const isCollection =
          Array.isArray(response) ||
          (response && Array.isArray(response[config.resultsKey]));
        return (!isCollection && response
          ? this.toOption(response, config)
          : undefined) as Option;
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
      limit: this.sanitizeLimit(merged.limit),
      resolveUrlTemplate: merged.resolveUrlTemplate
    };
  }

  // Schema JSON can carry the limit as a string (or garbage); only a positive
  // number is usable, anything else falls back to the bounded default.
  private sanitizeLimit(configured: unknown): number {
    const limit = Number(configured);
    return Number.isFinite(limit) && limit > 0 ? limit : DEFAULT_LIMIT;
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
