import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class QueryParametersService {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  /**
   * Get a specific query parameter by key.
   * @param key the key parameter
   * @return {string} the value of the key parameter or null if it doesn't exist
   */
  get(key: string): string | null {
    return this.route.snapshot.queryParamMap.get(key);
  }

  /**
   * Set new parameters to query of the current page. Add them at the end of the already existing parameters.
   * @param params {Record<string, string | null>} the parameters to add or update. If a parameter value is null, it will be removed from the query.
   */
  set(params: Record<string, string | null>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }

  /**
   * Remove the given keys from the query parameters. This is done by setting the value of the keys to null.
   * @param keys {string[]} the keys to remove.
   */
  remove(...keys: string[]): void {
    const nullified = Object.fromEntries(keys.map((k) => [k, null]));
    this.set(nullified);
  }

  /**
   * Clear all query parameters from the current page.
   * This is done by navigating to the same page with an empty query parameters object.
   */
  clear(): void {
    this.router.navigate([], { queryParams: {} });
  }
}
