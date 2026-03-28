import { useCallback, useEffect, useRef } from 'react';

/**
 * useTap
 * Counts taps within a maximum interval. If the interval between taps exceeds
 * `intervalMs`, the counter resets to 0. When `requiredTaps` is reached,
 * `onMatch` is invoked and the counter resets.
 *
 * @param requiredTaps Number of taps required to trigger `onMatch`
 * @param intervalMs Maximum allowed milliseconds between consecutive taps
 * @param onMatch Callback to invoke when the tap requirement is met
 * @returns A tap handler function suitable for `onPress`
 */
export function useTap(
  requiredTaps: number,
  intervalMs: number,
  onMatch: () => void,
) {
  const normalizedRequiredTaps = Math.max(1, Math.floor(requiredTaps || 1));
  const normalizedIntervalMs = Math.max(0, Math.floor(intervalMs || 0));

  const tapCountRef = useRef<number>(0);
  const lastTapTsRef = useRef<number | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  };

  const hardReset = () => {
    tapCountRef.current = 0;
    lastTapTsRef.current = null;
    clearResetTimer();
  };

  const scheduleReset = () => {
    clearResetTimer();
    if (normalizedIntervalMs > 0) {
      resetTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
        lastTapTsRef.current = null;
        resetTimerRef.current = null;
      }, normalizedIntervalMs);
    }
  };

  useEffect(() => {
    return () => {
      clearResetTimer();
    };
  }, []);

  const onTap = useCallback(() => {
    const now = Date.now();

    // Determine whether to increment or reset based on interval
    if (
      lastTapTsRef.current !== null &&
      now - lastTapTsRef.current <= normalizedIntervalMs
    ) {
      tapCountRef.current += 1;
    } else {
      tapCountRef.current = 1; // start a new sequence
    }

    lastTapTsRef.current = now;

    if (tapCountRef.current >= normalizedRequiredTaps) {
      // Condition met: invoke callback and reset
      try {
        onMatch();
      } finally {
        hardReset();
      }
      return;
    }

    // Not yet met: schedule an automatic reset if no further tap arrives in time
    scheduleReset();
  }, [normalizedIntervalMs, normalizedRequiredTaps, onMatch]);

  return onTap;
}

export default useTap;
