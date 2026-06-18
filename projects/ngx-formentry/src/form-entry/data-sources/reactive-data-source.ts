import { Observable } from 'rxjs';

/**
 * A data source that can notify the form when its internal state has changed
 * asynchronously (e.g. an HTTP fetch settled after the form already evaluated
 * its expressions synchronously).
 *
 * Form-schema expressions (hide/disable/alert) run synchronously, so an async
 * data source must cache its result and expose synchronous getters for the
 * expressions to read. Implementing this interface lets the data source tell
 * the {@link Form} to re-run those expressions once the cache is populated,
 * so the newly-available data is reflected in the UI.
 */
export interface ReactiveDataSource {
  /**
   * Emits whenever the data source has asynchronously updated its cached state.
   * The {@link Form} re-evaluates hide/disable/alert expressions on every emission.
   */
  readonly dataSourceChanges: Observable<unknown>;
}

export function isReactiveDataSource(
  dataSource: unknown
): dataSource is ReactiveDataSource {
  return (
    !!dataSource &&
    typeof (dataSource as ReactiveDataSource).dataSourceChanges?.subscribe ===
      'function'
  );
}
