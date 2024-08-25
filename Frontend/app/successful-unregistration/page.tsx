'use client'

import styles from './successfulUnregistration.module.scss'
import Button from '../components/Button/Button'
import { useTimer } from 'react-timer-hook'
import { useRouter } from 'next/navigation'

const successfulUnRegistration = () => {
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
                You have successfully unregistered from the event. We will redirect you back to the homepage in a few seconds.
            </div>
            <Button>Back to homepage</Button>
        </div>
    )
}

export default successfulUnRegistration
