'use client'

import BreadCrumbContainer from '../components/Breadcrumb/BreadcrumbContainer'
import styles from './eventRegistration.module.scss'
import InputGroup from '../components/InputGroup/InputGroup'
import { useCallback, useState } from 'react'
import Button from '../components/Button/Button'
import { useRouter } from 'next/navigation'

interface formMetaDataEntry {
    text: string,
    inputType: 'text' | 'checkbox' | 'date' | 'email' | 'password' | 'radio' | 'time' | 'tel',
}

const formMetaData: formMetaDataEntry[] = [
    {
        text: 'Name',
        inputType: 'text',
    },
    {
        text: 'Phone number',
        inputType: 'tel',
    },
]

const EventRegistration = () => {
    const [values, setValues] = useState<string[]>([])
    const router = useRouter()

    const buttonOnClick = useCallback(() => {
        router.push('/successful-registration')
    }, [])

    return (
        <form className={styles.body}>
            <BreadCrumbContainer role='member' eventName='Gathering Event' eventLink='/event-details' />
            <h1>Gathering Event</h1>
            {formMetaData.map((entry, i) => (
                <InputGroup text={entry.text} placeholder={entry.text} value={values[i]}
                    onChange={(e) => {
                        const newValues = [...values]
                        newValues[i] = e.target.value
                        setValues(newValues)
                    }} />
            ))}
            <Button type='submit' onClick={buttonOnClick}>Submit</Button>
        </form>
    )
}

export default EventRegistration
