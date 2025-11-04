export const safeNumber = (val: unknown, fallback = 5): number => {
  return typeof val === 'number' && Number.isFinite(val) ? val : fallback;
};
