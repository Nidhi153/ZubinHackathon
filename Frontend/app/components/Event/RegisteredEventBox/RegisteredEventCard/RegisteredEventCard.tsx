import styles from './RegisteredEventCard.module.scss'

interface RegisteredEventCardProps {
    title: string,
    date: string,
}

const RegisteredEventCard = ({ title, date }: RegisteredEventCardProps) => {
    return (
        <div className={styles.card}>
            <em>{title}</em>
            <span>{date}</span>
        </div>
    )
}

export default RegisteredEventCard
