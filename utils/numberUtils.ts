export const safeNumber = (val: any, fallback: number): number => {
  const num = Number(val);
  return isNaN(num) ? fallback : num;
};
