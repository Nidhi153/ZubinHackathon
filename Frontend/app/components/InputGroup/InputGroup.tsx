import { ChangeEventHandler } from "react"
import styles from './InputGroup.module.scss'

interface InputGroupProps {
    text: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    type?: string,
    isTextArea?: boolean,
}

const InputGroup = ({ text, placeholder, value, onChange, type = 'text', isTextArea = false }: InputGroupProps) => {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={text}>{text}</label>
            {!isTextArea
                ? <input id={text} value={value} placeholder={placeholder} onChange={onChange} type={type} />
                : <textarea id={text} value={value} placeholder={placeholder} onChange={onChange} />
            }
        </div>
    )
}

export default InputGroup
