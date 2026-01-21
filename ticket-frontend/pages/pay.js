export default function Pay() {
  async function confirmPaid() {
    const userId = localStorage.getItem("userId");

    const res = await fetch("/api/mint-ticket", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    const { tokenId } = await res.json();

    window.location.href = `/ticket?tokenId=${tokenId}`;
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>💳 Payment</h2>
      <p>Ticket Price: ₹499</p>
      <button onClick={confirmPaid}>Paid</button>
    </div>
  );
}
