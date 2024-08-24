'use client'

import { createWhatsappBroadcast, WhatsappBroadcast } from '../api/whatsappMessages';
import BreadCrumbContainer from '../components/Breadcrumb/BreadcrumbContainer';
import styles from './sendMessage.module.scss';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';
import Button from '../components/Button/Button';
// import { v4 as uuid } from 'uuid'

// to create a form

/* Planning to migrate this to a type file */
const ALL_ROLES = ['volunteer', 'admin', 'member'] as const;
type Roles = typeof ALL_ROLES[number];
const contacts: string[] = ["+852 53273686"];

const EventDetails = () => {
    const searchParams = useSearchParams();
    const [role, setRole] = useState<Roles>('admin');
    const [message, setMessage] = useState('');

    const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Sending message:', message);
        const broadcast: WhatsappBroadcast = {
            broadcast_id: "1234",
            message,
            contacts
        }
        try {
            const status = await createWhatsappBroadcast(broadcast);
            if (status === 200) { // take to success page
                console.log('Whatsapp broadcast created successfully');
            } else {
                console.error('Error creating Whatsapp broadcast:', status);
            }
        } catch (error) {
            console.error('Error creating Whatsapp broadcast:', error);
        }
    }


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
            <BreadCrumbContainer role={role} eventName='Gathering Event' eventLink='/event-details/send-message' />
            <div className={styles.heading}>Gathering Event</div>
            <div>10/09/2024</div>

            {role === 'admin'
                ? <div>
                     <form onSubmit={handleSubmit}>
                        <label htmlFor="message">Message:</label><br />
                        <textarea 
                            id="message" 
                            name="message" 
                            className={styles.messageBox}
                            rows={4} 
                            cols={50} 
                            value={message} 
                            placeholder='Message'
                            onChange={handleMessageChange}>
                        </textarea><br /><br />
                        <Button>Send Message</Button>
                    </form>
                </div>
                : ''}

        </div>
    )
}

export default EventDetails
