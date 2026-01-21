import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";

export default function UserVerify() {
  const { tokenId } = useRouter().query;
  const [status, setStatus] = useState("");

  async function allowEntry() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0xB6F6440dE7B38bAE5aBeac8f382e834c688beDdf";
      const abi = ["function confirmEntry(uint256)"];

      const contract = new ethers.Contract(contractAddress, abi, signer);

      setStatus("Confirming entry...");
      const tx = await contract.confirmEntry(tokenId);
      await tx.wait();

      setStatus("✅ Entry confirmed");
    } catch {
      setStatus("❌ Confirmation failed");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>🚪 Entry Request</h2>
      <p>Ticket ID: #{tokenId}</p>

      <button onClick={allowEntry}>✅ Allow Entry</button>

      <p>{status}</p>
    </div>
  );
}
