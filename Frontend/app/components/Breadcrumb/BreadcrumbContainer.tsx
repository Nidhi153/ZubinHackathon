import Breadcrumb from "./Breadcrumb"
import styles from './Breadcrumb.module.scss'

interface BreadCrumbContainerProps {
    role: 'admin' | 'member' | 'volunteer',
    eventName: string,
    eventLink: string,
}

const BreadCrumbContainer = ({ eventName, eventLink }: BreadCrumbContainerProps) => {
    return (
        <div className={styles.breadcrumbContainer}>
            <Breadcrumb text="Upcoming Events" href='/' />
            <div>{'>'}</div>
            <Breadcrumb text={eventName} href={eventLink} />
        </div>
    )
}

export default BreadCrumbContainer
