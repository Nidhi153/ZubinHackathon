import { Button, FloatingLabel } from "flowbite-react";

import "../auth.css";
export default function Page() {
  return (
    <div className="container">
      <h1>Signup</h1>

      <FloatingLabel variant="outlined" label="Email" />
      <FloatingLabel variant="outlined" label="Password" />

      <Button>Signup</Button>
      <p>
        If you already have an account, you can{" "}
        <a href="/authentication/login">login</a>
      </p>
    </div>
  );
}
