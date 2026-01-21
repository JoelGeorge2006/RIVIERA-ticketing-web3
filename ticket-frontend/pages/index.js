export default function Home() {
  function buy() {
    window.location.href = "/pay";
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎫 Web3 Ticketing</h1>
      <button onClick={buy}>Buy Ticket</button>
    </div>
  );
}
