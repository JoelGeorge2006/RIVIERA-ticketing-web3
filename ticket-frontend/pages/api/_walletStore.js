import { Wallet } from "ethers";

const PRIVATE_KEY = "b99ea7f5acd57c61740e405231f4875f18a429808519f5b16cd554e5d212406f";

const wallet = new Wallet(PRIVATE_KEY);

export function getWallet() {
  return wallet;
}
