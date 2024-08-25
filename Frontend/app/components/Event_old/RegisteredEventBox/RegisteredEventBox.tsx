import RegisteredEventCard from "./RegisteredEventCard/RegisteredEventCard"
import styles from './RegisteredEventBox.module.scss'

interface RegisteredEventBoxProps {
    eventDetails: {
        title: string,
        date: string,
    }[],
}

const RegisteredEventBox = ({ eventDetails }: RegisteredEventBoxProps) => {
    return (
        <div className={styles.box}>
            <h1>Registered Events</h1>
            {eventDetails.map((event) => (
                <RegisteredEventCard title={event.title} date={event.date} />
            ))}
          </div>
    )
}

export default RegisteredEventBox
