import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [status, setStatus] = useState("");

  async function buyTicket(type) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0xB6F6440dE7B38bAE5aBeac8f382e834c688beDdf";
      const abi = [
        "function mintTicket(address to)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      setStatus("Minting ticket...");

      const tx = await contract.mintTicket(await signer.getAddress());
      const receipt = await tx.wait();

      const event = receipt.logs.find(
        (l) => l.fragment && l.fragment.name === "Transfer"
      );
      const tokenId = event.args.tokenId.toString();

      window.location.href = `/ticket?tokenId=${tokenId}&type=${type}`;
    } catch {
      setStatus("❌ Failed");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎫 Web3 Ticketing</h1>

      <button onClick={() => buyTicket("GOLD")}>Buy Gold</button>
      <button onClick={() => buyTicket("SILVER")}>Buy Silver</button>

      <p>{status}</p>
    </div>
  );
}
