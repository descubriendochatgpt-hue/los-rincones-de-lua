/** Reintenta `fn` con backoff exponencial (500 ms, 1 s, 2 s…) mientras `shouldRetry` devuelva true. */
export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  { retries = 2, baseMs = 500, shouldRetry = () => true }: { retries?: number; baseMs?: number; shouldRetry?: (e: unknown) => boolean } = {},
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn(attempt);
    } catch (e) {
      lastError = e;
      if (attempt === retries || !shouldRetry(e)) break;
      await new Promise((r) => setTimeout(r, baseMs * 2 ** attempt));
    }
  }
  throw lastError;
}
