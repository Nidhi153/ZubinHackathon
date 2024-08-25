import Image from "next/image"
import backgroundImage from '../../assets/homepageImage.png'
import styles from '../../app.module.scss'

interface HomepageLayoutProps {
    header: string,
    children: JSX.Element,
}

const HomepageLayout = ({ header, children }: HomepageLayoutProps) => {
    return (
        <div className={styles.layout}>
            <div className={styles.imageWrapper}>
                <Image src={backgroundImage} alt="Homepage Image" />
            </div>
            <div className={styles.container}>
                <div className={styles.header}>{header}</div>
                {children}
            </div>
        </div>
    )
}

export default HomepageLayout
