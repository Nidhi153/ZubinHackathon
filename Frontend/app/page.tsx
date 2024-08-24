import Image from "next/image"
import backgroundImage from './assets/homepageImage.png'
import styles from './app.module.scss'
import EventCard from "./components/Event/EventCard/EventCard"
import RegisteredEventCard from "./components/Event/RegisteredEventCard/RegisteredEventCard";

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.imageWrapper}>
        <Image src={backgroundImage} alt="Homepage Image" />
      </div>
      <div className={styles.container}>
        <div className={styles.header}>Upcoming Events</div>
        <div className={styles.body}>
          <div className={styles.cards}>
            <EventCard title="Gathering Event" date="10/09/2024" description="Everyone can join!" />
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
