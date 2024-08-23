import styles from './Navbar.module.scss'
import logo from '../../assets/logo.png'
import Image from 'next/image'
import Tab from './Tab/Tab'
import AccountButton from './AccountButton/AccountButton'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.wrapper}>
                <Image src={logo} alt='Zubin Foundation Logo' height={90} />
                <div className={styles.rightContainer}>
                    <Tab>All Events</Tab>
                    <Tab>Create an Event</Tab>
                    <AccountButton username='Username' />
                </div>
            </div>
        </div>
    )
}

export default Navbar
