"use client";
import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
// import Header from "../Navbar/Header/Header"

export default function Authentication({ setUserId }) {
  return (
    <div className="auth-container">
      {/* <Header /> */}
      <Signup setUserId={setUserId} />
      <Login setUserId={setUserId} />
    </div>
  );
}
