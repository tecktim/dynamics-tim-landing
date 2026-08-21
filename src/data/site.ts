/**
 * Central site configuration.
 *
 * Availability is maintained here — update `availability.label` and
 * `availability.availableFrom` when the next free capacity changes.
 * All UI components import this value; no hardcoded strings elsewhere.
 */
export const site = {
  availability: {
    /** Display label shown in the UI, e.g. "Q1 2027" */
    label: 'Q1 2027',
    /** ISO date of the first available day */
    availableFrom: '2027-02-01',
  },
} as const;
