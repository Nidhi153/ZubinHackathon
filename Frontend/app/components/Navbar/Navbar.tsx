"use client";
import styles from "./Navbar.module.scss";
import logo from "../../assets/logo.png";
import Image from "next/image";
import Tab from "./Tab/Tab";
import AccountButton from "./AccountButton/AccountButton";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const routes = [
    { route: "/", name: "Home" },
    { route: "/dashboard", name: "Dashboard" },
  ];
  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("userid", userId);
    setUserId(userId);
  });
  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <Image src={logo} alt="Zubin Foundation Logo" height={90} />
        <div className={styles.rightContainer}>
          {routes.map((route) => (
            <Tab key={route.route}>
              {" "}
              <a href={route.route}>{route.name} </a>
            </Tab>
          ))}
          {!userId && (
            <Tab>
              <a href="/login">Login</a>
            </Tab>
          )}
          {/* <Tab>All Events</Tab>
          <Tab>Create an Event</Tab> */}
          <AccountButton username="Username" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
