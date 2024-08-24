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
  const [role, setRole] = useState(null);
  const routes = [{ route: "/", name: "Home" }];
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      console.log("userid", userId);
      setUserId(userId);
    }
    const role = Cookies.get("role");
    console.log("role", role);
    setRole(role);
  }, []);
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
          {role && role == "admin" && (
            <Tab>
              <a href="/dashboard">Dashboard </a>
            </Tab>
          )}
          {userId ? (
            <AccountButton username="Username" />
          ) : (
            <Tab>
              <a href="/login">Login</a>
            </Tab>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
