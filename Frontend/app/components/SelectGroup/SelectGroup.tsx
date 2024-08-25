import styles from './SelectGroup.module.scss'

interface SelectGroupProps {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const options = [
    'short answer', 'paragraph', 'date', 'time',
]

const SelectGroup = ({ label,  value, onChange }: SelectGroupProps) => {
    return (
        <div className={styles.selectGroup}>
            <label htmlFor={label}>{label}</label>
            <select name={label} id={label} required value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectGroup
