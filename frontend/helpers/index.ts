import { BigNumberish, utils } from "ethers";

export const formatEth = (value: BigNumberish, format: string | undefined) =>
  utils.formatUnits(value, format);

export const parseUnits = (value: string) => utils.parseUnits(value.toString());
