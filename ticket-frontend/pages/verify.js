import { useState } from "react";
import { ethers } from "ethers";

export default function Verify() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState("");

  async function check() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(
      "0x3eDe913DbB5aB11e2386Bd0b192Ae3a725d57f10",
      ["function used(uint256) view returns (bool)"],
      provider
    );

    const used = await contract.used(ticketId);
    setStatus(used ? "✅ Entry Allowed" : "⏳ Waiting for approval");
  }

  return (
    <div style={{ padding: 40 }}>
      <input onChange={e => setTicketId(e.target.value)} />
      <button onClick={check}>Check</button>
      <p>{status}</p>
    </div>
  );
}
