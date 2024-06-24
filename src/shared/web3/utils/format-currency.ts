import { formatUnits } from "viem";

export const formatCurrency = (
  value: bigint,
  exponent: number,
  precision = 3,
  separator = "."
) => {
  const fullFormattedValue = formatUnits(value, exponent);
  const [integers, decimals] = fullFormattedValue.split(".");

  return `${integers}${separator}${decimals.slice(0, precision)}`;
};
