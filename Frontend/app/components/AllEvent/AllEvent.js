import React from "react";
import styles from "../../app.module.scss";
import Event from "../Event/AllEvent";
import RegisteredEvent from "./RegisteredEvent";
import registerStyles from "../Event/RegisteredEventBox/RegisteredEventBox.module.scss";
import Recommendation from "./Recommendation";

const EventPage = () => {
  return (
    <div>
      <div className={styles.body}>
        <div className={styles.cards}>
          <Event />
        </div>
        <div className={registerStyles.box}>
          <h1 className="text-center">Registered Events</h1>
          <RegisteredEvent />
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
