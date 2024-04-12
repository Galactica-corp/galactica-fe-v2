import { isAddress } from "viem";

export function shortAddress(
  address: null | string | undefined,
  startCount = 7,
  endCount = 0
) {
  if (!address) return "";
  if (isAddress(address)) {
    return (
      address.substring(0, startCount) +
      (endCount > 0 ? `...${address.substring(address.length - endCount)}` : "")
    );
  }

  return address;
}
