"use client";

import { Badge } from "flowbite-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import styles from "./account.module.scss";
import TextRow from "./Row/TextRow";
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
      setUser(data.user);
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
      {user && user.role === "volunteer" ? (
        <div className={styles.badges}>
          <div className={styles.subheading}>Badges</div>

          {(user &&
            user.skills.length > 0 &&
            [...new Set(user.skills)].map((skill, index) => (
              <Badge
                key={index}
                style={{
                  width: "100px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
                {skill}
              </Badge>
            ))) || (
            <div>
              No badges yet, do a training for badges at by registering as
              volunteers in the events
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
