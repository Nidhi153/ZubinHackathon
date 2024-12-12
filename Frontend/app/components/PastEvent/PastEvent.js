"use client";
import React from "react";
import styles from './eventDetails.module.scss'

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
            <div className={styles.heading}>Past Events</div>
            <Event filterFunction={filterPastEvents} />
        </div>
    </div>
  );
};

export default PastEventPage;
