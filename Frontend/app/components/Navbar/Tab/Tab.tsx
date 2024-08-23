import styles from './Tab.module.scss'

interface TabProps {
    children: string,
}

const Tab = ({ children }: TabProps) => {
    return (
        <div className={styles.tab}>{children}</div>
    )
}

export default Tab
