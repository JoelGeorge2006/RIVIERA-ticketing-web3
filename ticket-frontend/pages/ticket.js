import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Ticket() {
  const { tokenId } = useRouter().query;
  const [qr, setQr] = useState("");

  useEffect(() => {
    if (!tokenId) return;
    QRCode.toDataURL(
      `${window.location.origin}/user-verify?tokenId=${tokenId}`
    ).then(setQr);
  }, [tokenId]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Your Ticket #{tokenId}</h2>
      {qr && <img src={qr} />}
      <p>Show this QR at entry</p>
    </div>
  );
}
