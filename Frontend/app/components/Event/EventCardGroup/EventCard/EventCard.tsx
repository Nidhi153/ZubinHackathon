import Image from 'next/image'
import styles from './EventCard.module.scss'
import arrowIcon from '../../../../assets/arrowIcon.svg'

interface EventCardProps {
    title: string,
    date: string,
    description: string,
}

const EventCard = ({ title, date, description }: EventCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                <span>{date}</span>
                <span>{description}</span>
            </div>
            <Image src={arrowIcon} alt='Arrow Icon' className={styles.icon} />
        </div>
    )
}

export default EventCard
