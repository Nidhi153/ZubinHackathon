"use client";

import styles from "./app.module.scss";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import HomepageLayout from "./components/HomepageLayout/HomepageLayout";
import RegisteredEventBox from "./components/Event/RegisteredEventBox/RegisteredEventBox";
import EventCardGroup from "./components/Event/EventCardGroup/EventCardGroup";
import Event from "./components/AllEvent/AllEvent";
export default function Home() {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const role = Cookies.get("role");
    if (role) {
      setRole(role);
    }
  }, []);

  return (
    <HomepageLayout header="Upcoming Events">
      {/* <div className={styles.body}> */}
      {/* <div className={styles.cards}></div> */}
      <Event />
      {/* </div> */}
    </HomepageLayout>
  );
}
