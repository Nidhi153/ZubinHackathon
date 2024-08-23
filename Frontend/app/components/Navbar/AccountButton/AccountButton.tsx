import Image from 'next/image'
import userIcon from '../../../assets/userIcon.svg'
import styles from './AccountButton.module.scss'

interface AccountButtonProps {
    username: string,
}

const AccountButton = ({ username }: AccountButtonProps) => {
    return (
        <div className={styles.accountButton}>
            <Image src={userIcon} alt='User Icon' />
            <div>{username}</div>
        </div>
    )
}

export default AccountButton
