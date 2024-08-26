import styles from "../Event/RegisteredEventBox/RegisteredEventCard/RegisteredEventCard.module.scss";
import "./Event.css";

export default function RegisteredEventBox({ event }) {
  const displayedDate = new Date(event.date).toDateString();
  return (
    <div className={styles.card}>
        <em>{event.title}</em>
        <span>{displayedDate}</span>
    </div>
  );
}
