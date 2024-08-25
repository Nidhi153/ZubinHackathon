"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
import styles from "./account.module.scss";
import BadgeRow from "./Row/BadgeRow";
import TextRow from "./Row/TextRow";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const Account = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();
  useEffect(() => {
    let init = async () => {
      const userId = Cookies.get("userId");
      let response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setUser(data);
      const role = Cookies.get("role");
      if (!role) {
        router.push("/");
      }
      setRole(role);
    };
    init();
  }, []);
  let signout = () => {
    Cookies.remove("userId");
    Cookies.remove("role");
    router.push("/");
  };
  return (
    <div className={styles.body}>
      <div className={styles.heading}>Account</div>
      <div className={styles.rowWrapper}>
        {user && (
          <>
            <TextRow property="Name" value={user.name} />
            <TextRow property="Role" value={user.role} />
            <TextRow property="Email" value={user.email} />
            <TextRow property="Phone Number" value={user.phoneno} />
          </>
        )}
      </div>

      {/* Badges are only visible to volunteer */}
      {user && user.role === "volunteer" ? (
        <div className={styles.badges}>
          <div className={styles.subheading}>Badges</div>

          {(user && user.skill && user.skill.length > 0 && (
            <div className={styles.badgeRows}>
              <BadgeRow property="Public speaking" level="none" />
              <BadgeRow property="Public speaking" level="bronze" />
              <BadgeRow property="Public speaking" level="silver" />
              <BadgeRow property="Public speaking" level="gold" />
            </div>
          )) || (
            <div>
              No badges yet, do a training for badges at{" "}
              <Button>trainings page</Button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      <Button background="error" onClick={() => signout()}>
        Sign out
      </Button>
    </div>
  );
};

export default Account;
