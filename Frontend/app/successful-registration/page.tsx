'use client'

import styles from './successfulRegistration.module.scss'
import Button from '../components/Button/Button'
import { useTimer } from 'react-timer-hook'
import { useRouter } from 'next/navigation'

const successfulRegistration = () => {
    const router = useRouter()
    useTimer({
        expiryTimestamp: new Date(Date.now() + 600 * 2), // 2 seconds after starting to count down
        onExpire: () => {
            router.push('/')
        }
    })

    return (
        <div className={styles.body}>
            <div className={styles.heading}>
                Your registration is successful. We will redirect you back to the homepage in a few seconds.
            </div>
            <Button>Back to homepage</Button>
        </div>
    )
}

export default successfulRegistration
