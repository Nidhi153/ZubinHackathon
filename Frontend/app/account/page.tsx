'use client'

import Button from '../components/Button/Button'
import styles from './account.module.scss'
import BadgeRow from './Row/BadgeRow'
import TextRow from './Row/TextRow'

const Account = () => {
    return (
        <div className={styles.body}>
            <div className={styles.heading}>Account</div>
            <div className={styles.rowWrapper}>
                <TextRow property='Name' value='Username' />
                <TextRow property='Role' value='Volunteer' />
            </div>
            <div className={styles.badges}>
                <div className={styles.subheading}>Badges</div>
                <div className={styles.badgeRows}>
                    <BadgeRow property='Public speaking' level='none' />
                    <BadgeRow property='Public speaking' level='bronze' />
                    <BadgeRow property='Public speaking' level='silver' />
                    <BadgeRow property='Public speaking' level='gold' />
                </div>
            </div>
            <Button background='error'>Sign out</Button>
        </div>
    )
}

export default Account
