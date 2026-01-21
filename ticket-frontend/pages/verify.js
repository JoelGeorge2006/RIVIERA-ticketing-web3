import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { ethers } from "ethers";

export default function Verify() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState("");

  // ✅ START CAMERA SCANNER
  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          // QR contains link: /user-verify?tokenId=X
          try {
            const url = new URL(decodedText);
            const id = url.searchParams.get("tokenId");
            if (id) {
              setTicketId(id);
              scanner.stop();
            }
          } catch {
            console.error("Invalid QR");
          }
        }
      )
      .catch(console.error);

    return () => {
      scanner.stop().catch(() => {});
    };
  }, []);

  async function checkStatus() {
    try {
      if (!ticketId) {
        setStatus("❌ No ticket scanned");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        "0xB6F6440dE7B38bAE5aBeac8f382e834c688beDdf",
        ["function used(uint256) view returns (bool)"],
        provider
      );

      const isUsed = await contract.used(ticketId);

      if (isUsed) {
        setStatus("✅ Entry Allowed (User approved)");
      } else {
        setStatus("⏳ Waiting for user approval");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error checking ticket");
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>🚪 Gate Verification</h2>

        {/* 📷 QR SCANNER */}
        <div id="reader" style={{ width: "100%" }} />

        <input
          value={ticketId}
          readOnly
          placeholder="Scanned Ticket ID"
          style={styles.input}
        />

        <button onClick={checkStatus} style={styles.button}>
          Check Entry Status
        </button>

        <p style={{ marginTop: 15 }}>{status}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #000428, #004e92)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "16px",
    width: "360px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginTop: "10px",
    padding: "8px",
    textAlign: "center",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    width: "100%",
    fontWeight: "bold",
  },
};

