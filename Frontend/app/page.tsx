'use client'

import styles from './app.module.scss'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import HomepageLayout from "./components/HomepageLayout/HomepageLayout"
import RegisteredEventBox from "./components/Event/RegisteredEventBox/RegisteredEventBox"
import EventCardGroup from './components/Event/EventCardGroup/EventCardGroup'

export default function Home() {
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const role = Cookies.get('role')
    if (role) {
      setRole(role)
    }
  }, [])

  return (
    <HomepageLayout header="Upcoming Events">
      <div className={styles.body}>
        <div className={styles.cards}>

          {/* Suggested events for volunteers, only visible to volunteers */}
          {role === 'volunteer'
            ? <div className={styles.eventCardSection}>
              <h1>Suggested Events</h1>
              <EventCardGroup eventDetails={[
                {
                  title: 'Gathering Event',
                  date: '10/09/2024',
                  description: 'Everyone can join!',
                }
              ]} />
            </div>
            : ''}

          {/* All events for admin and participant, suggested events are filtered out for volunteers */}
          <div className={styles.eventCardSection}>
            {role === 'volunteer' ? <h1>Other Events</h1> : ''}
            <EventCardGroup eventDetails={[
              {
                title: 'Gathering Event',
                date: '10/09/2024',
                description: 'Everyone can join!',
              }
            ]} />
          </div>
        </div>

        {/* Only visible to member and volunteer */}
        {role !== 'admin'
          ? <RegisteredEventBox eventDetails={[
            {
              title: 'Gathering Event',
              date: '10/09/2024',
            },
          ]} />
          : ''}
      </div>
    </HomepageLayout>
  );
}
