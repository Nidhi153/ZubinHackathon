"use client";
import Login from "./Login";
import Signup from "./Signup";

export default function Authentication({ setUserId }) {
  return (
    <div className="auth-container">
      <Signup setUserId={setUserId} />
      <Login setUserId={setUserId} />
    </div>
  );
}
