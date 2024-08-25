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
    const fetchData = () => {
      const userId = Cookies.get("userId");
      if (userId) {
        // console.log("userid", userId);
        setUserId(userId);
      } else {
        setUserId(null);
      }
      const role = Cookies.get("role");

      // console.log("role", role);
      if (role) {
        setRole(role);
      } else {
        setRole(null);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch every 1 second

    return () => clearInterval(intervalId); // Cleanup on unmount
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
            <>
              <Tab>
                <a href="/dashboard">Dashboard </a>
              </Tab>
              <Tab>
                <a href="/create-event">Create Event </a>
              </Tab>
            </>
          )}
          {userId ? (
            <AccountButton username="User" />
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
