import Image from 'next/image';
import arrowIcon from "../../assets/arrowIcon.svg";
import "./Event.css";
import styles from "./EventCardGroup/EventCard/EventCard.module.scss";

import { useRouter } from "next/navigation";
export default function EventBox({ key, event }) {
  const router = useRouter();
  let displayEventDetail = (id) => {
    console.log("Displaying event detail with id: ", id);
    router.push(`/event/${id}`);
  };

  const dateDisplay = new Date(event.date).toDateString();
  return (
    <div 
    onClick={() => displayEventDetail(event._id)}
    className={styles.card}>
        <div className={styles.text}>
            <span className={styles.title}>{event.title}</span>
            <span>{dateDisplay}</span>
            <span>{event.description}</span>
        </div>
        <Image src={arrowIcon} alt='Arrow Icon' className={styles.icon} />
    </div>
  );
}
