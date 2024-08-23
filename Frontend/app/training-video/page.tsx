'use client'

import BreadCrumbContainer from "../components/Breadcrumb/BreadcrumbContainer"
import styles from './trainingVideo.module.scss'
import Button from "../components/Button/Button"
import { YouTubeEmbed } from "@next/third-parties/google"
import { useCallback, useState } from "react"
import { Checkbox } from "@chakra-ui/react"
import { useRouter } from 'next/navigation'

const trainingVideo = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const router = useRouter()
    const [showWarning, setShowWarning] = useState<boolean>(false)

    const checkboxOnClick = useCallback(() => {
        setChecked(!checked)
        console.log('Checkbox state: ' + checked)
    }, [checked])

    const buttonOnClick = useCallback(() => {
        if (checked) {
            router.push('/training-video/successful-registration')
        } else {
            setShowWarning(true)
        }
    }, [checked, router])

    return (
        <div className={styles.body}>
            <BreadCrumbContainer role="volunteer" eventName="Gathering Event" eventLink="/event-details" />
            <YouTubeEmbed videoid="1FLYZdxsteo" height={400} width={720} />
            <Checkbox onInput={checkboxOnClick}>I have finished watching the training video.</Checkbox>
            <div className={styles.buttonWrapper}>
                <Button onClick={buttonOnClick}>Confirm</Button>
                {showWarning
                    ? <span>Warning: please tick the checkbox to confirm that you have finished the training.</span>
                    : ''
                }
            </div>
        </div>
    )
}

export default trainingVideo
