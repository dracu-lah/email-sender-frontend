/**
 * Approximates a float aspect ratio as a simplified fraction string (e.g. 1.777 -> "16:9").
 *
 * @param aspect - The floating-point aspect ratio.
 * @param maxDenominator - The maximum denominator to consider when approximating.
 * @returns A string representing the simplified aspect ratio.
 */
export function formatAspectRatio(
  aspect: number,
  maxDenominator: number = 100,
): string {
  let bestNumer = 1;
  let bestDenom = 1;
  let bestError = Math.abs(aspect - bestNumer / bestDenom);

  for (let denom = 1; denom <= maxDenominator; denom++) {
    const numer = Math.round(aspect * denom);
    const error = Math.abs(aspect - numer / denom);

    if (error < bestError) {
      bestNumer = numer;
      bestDenom = denom;
      bestError = error;
    }

    if (bestError < 1e-6) break;
  }

  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  const divisor = gcd(bestNumer, bestDenom);

  const simplifiedNumer = bestNumer / divisor;
  const simplifiedDenom = bestDenom / divisor;

  return `${simplifiedNumer}:${simplifiedDenom}`;
}
