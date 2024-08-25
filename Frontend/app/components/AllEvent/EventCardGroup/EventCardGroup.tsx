import EventCard from "./EventCard/EventCard"
import styles from './EventCardGroup.module.scss'

interface EventCardGroupProps {
    eventDetails: {
        title: string,
        date: string,
        description: string,
    }[],
}

const EventCardGroup = ({ eventDetails }: EventCardGroupProps) => {
    return (
        <div className={styles.eventCards}>
            {eventDetails.map((event) => (
                <EventCard title={event.title} date={event.date} description={event.description} />
            ))}
        </div>
    )
}

export default EventCardGroup
