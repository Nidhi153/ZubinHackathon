'use client'

import Image from 'next/image'
import chatbotStyles from '../chatbot/chatbotPage.module.scss'
import BreadCrumbContainer from '../components/Breadcrumb/BreadcrumbContainer'
import Chatbot from '../components/Chatbot/Chatbot'
import styles from './eventDetails.module.scss'
import posterImage from '../assets/poster.png'
import Button from '../components/Button/Button'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/* Planning to migrate this to a type file */
const ALL_ROLES = ['volunteer', 'admin', 'member'] as const
type Roles = typeof ALL_ROLES[number]

const EventDetails = () => {
    const searchParams = useSearchParams()
    const [role, setRole] = useState<Roles>('member')

    /* Update the role whenever the link refreshes */
    useEffect(() => {
        const role = searchParams.get('role')
        if (role && ALL_ROLES.includes(role as Roles)) {
            setRole(role as Roles)
            console.log('role is ' + role)
        }
    }, [searchParams])

    return (
        <div className={styles.body}>
            <BreadCrumbContainer role={role} eventName='Gathering Event' eventLink='/event-details' />
            <div className={styles.heading}>Gathering Event</div>
            <div>10/09/2024</div>
            <Image src={posterImage} alt='Poster Image' height={260} />

            {/* Member and volunteer only */}
            {role !== 'admin'
                ? <div className={styles.horizontalButtonWrapper}>
                    <Button>Register</Button>
                    {role === 'volunteer' ? <Button background='brown'>Register as volunteer</Button> : ''}
                </div>
                : ''}

            {role === 'admin'
                ? <div className={styles.verticalButtonWrapper}>
                    <Button>See registration data</Button>
                    <Button>Send message to participants</Button>
                </div>
                : ''}

            {/* Fixed on page, only show to volunteers and members */}
            {role !== 'admin'
                ? <div className={chatbotStyles.chatbotWrapper}>
                    <Chatbot />
                </div>
                : ''}
        </div>
    )
}

export default EventDetails
