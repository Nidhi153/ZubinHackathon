import styles from './Row.module.scss'
import Image from 'next/image'
import noneBadge from '../../assets/noneBadge.svg'
import bronzeBadge from '../../assets/bronzeBadge.svg'
import silverBadge from '../../assets/silverBadge.svg'
import goldBadge from '../../assets/goldBadge.svg'

interface BadgeRowProps {
    property: string,
    level: 'none' | 'bronze' | 'silver' | 'gold',
}

const BadgeRow = ({ property, level }: BadgeRowProps) => {
    return (
        <div className={styles.row}>
            <span>{property}</span>
            {level === 'none'
                ? <div className={styles.badges}>
                    <Image src={noneBadge} alt='None badge' />
                    <Image src={noneBadge} alt='None badge' />
                    <Image src={noneBadge} alt='None badge' />
                </div>
                : (level === 'bronze'
                    ? <div className={styles.badges}>
                        <Image src={bronzeBadge} alt='Bronze badge' />
                        <Image src={noneBadge} alt='None badge' />
                        <Image src={noneBadge} alt='None badge' />
                    </div>
                    : (level === 'silver'
                        ? <div className={styles.badges}>
                            <Image src={bronzeBadge} alt='Bronze badge' />
                            <Image src={silverBadge} alt='Silver badge' />
                            <Image src={noneBadge} alt='None badge' />
                        </div>
                        : <div className={styles.badges}>
                            <Image src={bronzeBadge} alt='Bronze badge' />
                            <Image src={silverBadge} alt='Silver badge' />
                            <Image src={goldBadge} alt='Gold badge' />
                        </div>
                    )
                )}

        </div>
    )
}

export default BadgeRow
