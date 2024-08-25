import React from "react";
import styles from "../../app.module.scss";
import Event from "../Event/AllEvent";
import RegisteredEvent from "./RegisteredEvent";
import registerStyles from "../Event/RegisteredEventBox/RegisteredEventBox.module.scss";
import Recommendation from "./Recommendation";
const registerStyle = {
  fontSize: "25px",
};

const EventPage = () => {
  return (
    <div>
      <div
        className={styles.body}
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   padding: "10px 10px",
        //   marginLeft: "5%",
        //   marginRight: "5%",
        // }}
      >
        {/* <br></br> */}
        <div
          className={styles.cards}
          // style={{ width: "60%", borderRadius: "5px", padding: "10px" }}
        >
          <Event />
        </div>
        <div
          className={registerStyles.box}
          // style={{
          //   flex: "1",
          //   border: "1px solid #ccc",
          //   borderRadius: "5px",
          //   padding: "10px",
          //   // transform: "translate(35%, 3%)",
          // }}
        >
          <h1 className="text-center">Registered Events</h1>
          <RegisteredEvent />
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
