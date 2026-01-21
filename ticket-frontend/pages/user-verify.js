import { useRouter } from "next/router";
import { useState } from "react";

export default function UserVerify() {
  const { tokenId } = useRouter().query;
  const [status, setStatus] = useState("");

  async function allow() {
    const userId = localStorage.getItem("userId");

    await fetch("/api/confirm-entry", {
      method: "POST",
      body: JSON.stringify({ userId, tokenId }),
    });

    setStatus("✅ Entry confirmed");
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>🚪 Entry Request</h2>
      <p>Ticket #{tokenId}</p>
      <button onClick={allow}>Allow Entry</button>
      <p>{status}</p>
    </div>
  );
}
