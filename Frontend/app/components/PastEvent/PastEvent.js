"use client";
import React from "react";
import styles from './eventDetails.module.scss'
// import Box from '@mui/material/Box';

import Event from "../Event/AllEvent";

const PastEventPage = () => {
  const filterPastEvents = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate < today;
  };

  return (
    <div>
        <div className={styles.body}>
            <div className={styles.heading}>Member Feedback</div>
            <div
            style={{
                // display: "flex",
                // justifyContent: "space-between",
                // padding: "10px 10px",
                // marginLeft: "20%",
                // marginRight: "20%",
            }}
            >
            <Event filterFunction={filterPastEvents} />
            </div>
        </div>
    </div>
  );
};

export default PastEventPage;
