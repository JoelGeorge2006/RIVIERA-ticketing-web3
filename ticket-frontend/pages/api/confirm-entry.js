import { ethers } from "ethers";
import { getWallet } from "./_walletStore";

const CONTRACT_ADDRESS = "0x3eDe913DbB5aB11e2386Bd0b192Ae3a725d57f10";
const ABI = ["function confirmEntry(uint256)"];

export default async function handler(req, res) {
  try {
    const { userId, tokenId } = JSON.parse(req.body);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = getWallet(userId).connect(provider);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
    await contract.confirmEntry(tokenId);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
