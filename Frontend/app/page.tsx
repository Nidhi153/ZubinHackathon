'use client'

import Image from "next/image"
import backgroundImage from './assets/homepageImage.png'
import styles from './app.module.scss'
import EventCard from "./components/Event/EventCard/EventCard"
import RegisteredEventCard from "./components/Event/RegisteredEventCard/RegisteredEventCard"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"

export default function Home() {
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const role = Cookies.get('role')
    if (role) {
      setRole(role)
    }
  }, [])

  return (
    <div className={styles.layout}>
      <div className={styles.imageWrapper}>
        <Image src={backgroundImage} alt="Homepage Image" />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>Upcoming Events</div>
        <div className={styles.body}>
          <div className={styles.cards}>
            {role === 'volunteer'
              ? <div className={styles.eventCardSection}>
                <h1>Suggested Events</h1>
                <div className={styles.eventCards}>
                  <EventCard title="Gathering Event" date="10/09/2024" description="Everyone can join!" />
                </div>
              </div>
              : ''}

            <div className={styles.eventCardSection}>
              {role === 'volunteer' ? <h1>Other Events</h1> : ''}
              <div className={styles.eventCards}>
                <EventCard title="Gathering Event" date="10/09/2024" description="Everyone can join!" />
              </div>
            </div>
          </div>
          <div className={styles.registeredEventsBox}>
            <h1>Registered Events</h1>
            <RegisteredEventCard title="Gathering Event" date="10/09/2024" />
          </div>
        </div>
      </div>
    </div>
  );
}
