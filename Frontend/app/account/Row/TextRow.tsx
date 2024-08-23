import styles from './Row.module.scss'

interface TextRowProps {
    property: string,
    value: string,
}

const TextRow = ({ property, value }: TextRowProps) => {
    return (
        <div className={styles.row}>
            <span>{property}</span>
            <span>{value}</span>
        </div>
    )
}

export default TextRow
