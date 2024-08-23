import { Button, FloatingLabel } from "flowbite-react";

import "../auth.css";
export default function Page() {
  return (
    <div className="container">
      <h1>Login</h1>

      <FloatingLabel variant="outlined" label="Email" />
      <FloatingLabel variant="outlined" label="Password" />

      <Button>Login</Button>
    </div>
  );
}
