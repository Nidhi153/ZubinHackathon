import BreadCrumbContainer from "../components/Breadcrumb/BreadcrumbContainer"
import styles from './trainingVideo.module.scss'
import CheckboxGroup from '../components/CheckboxGroup/CheckboxGroup'
import Button from "../components/Button/Button"
import { YouTubeEmbed } from "@next/third-parties/google"


const trainingVideo = () => {
    return (
        <div className={styles.body}>
            <BreadCrumbContainer role="volunteer" eventName="Gathering Event" eventLink="/event-details" />
            <YouTubeEmbed videoid="1FLYZdxsteo" height={400} width={720} />
            <CheckboxGroup>I have finished watching the training video.</CheckboxGroup>
            <Button>Confirm</Button>
        </div>
    )
}

export default trainingVideo
