import { lazy, type ComponentType } from 'react';

/**
 * Deploys replace the content-hashed chunk files, so a browser holding a
 * cached index.html will 404 when it lazily imports a route ("Importing a
 * module script failed" on iOS Safari). That's a stale manifest, not a
 * real crash — one reload fetches the fresh index.html and heals it.
 */
const RELOAD_GUARD_KEY = 'sg-chunk-reloaded';

/** Failed dynamic imports phrase it differently per engine. */
export function isStaleChunkError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /module script failed|dynamically imported module|Loading chunk|Load failed/i.test(
    message
  );
}

function readGuard(): boolean {
  try {
    return sessionStorage.getItem(RELOAD_GUARD_KEY) === '1';
  } catch {
    return true; // storage unavailable → never auto-reload (avoid loops)
  }
}

function writeGuard() {
  try {
    sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
  } catch {
    /* storage unavailable — guard already reported true */
  }
}

function clearGuard() {
  try {
    sessionStorage.removeItem(RELOAD_GUARD_KEY);
  } catch {
    /* nothing to clear */
  }
}

/**
 * `React.lazy` with stale-deploy recovery: if the chunk fails to load and
 * we haven't already tried, hard-reload once to pick up the new manifest.
 * A successful load clears the guard so the *next* deploy gets its own
 * retry; a second consecutive failure falls through to the ErrorBoundary.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  load: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const module = await load();
      clearGuard();
      return module;
    } catch (error) {
      if (isStaleChunkError(error) && !readGuard()) {
        writeGuard();
        window.location.reload();
        // Keep the Suspense fallback up while the reload happens.
        return new Promise<{ default: T }>(() => {});
      }
      throw error;
    }
  });
}
