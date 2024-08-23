export default function Page() {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign Up</button>
      </form>
      <p>
        If you already have an account, you can{" "}
        <a href="/authentication/login">login</a>
      </p>
    </div>
  );
}
