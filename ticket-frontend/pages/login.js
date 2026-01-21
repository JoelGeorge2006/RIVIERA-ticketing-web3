export default function Login() {
  function login() {
    localStorage.setItem("userId", "user@gmail.com");
    window.location.href = "/";
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Sign in</h2>
      <button onClick={login}>Sign in with Google</button>
    </div>
  );
}
