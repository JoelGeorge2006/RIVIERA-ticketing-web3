import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode";

export default function Ticket() {
  const router = useRouter();
  const { tokenId, type } = router.query;
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (!tokenId) return;

    // ✅ QR CONTAINS LINK TO USER CONFIRM PAGE
    const qrLink = `${window.location.origin}/user-verify?tokenId=${tokenId}`;

    QRCode.toDataURL(qrLink).then(setQr);
  }, [tokenId]);

  if (!tokenId) return <p>Loading...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>🎟️ Your Ticket</h2>
      <p>Type: {type}</p>
      <p>ID: #{tokenId}</p>

      {qr && <img src={qr} />}
      <p>Show this QR at entry</p>
    </div>
  );
}
