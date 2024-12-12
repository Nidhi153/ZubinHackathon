import InputGroup from "../InputGroup/InputGroup"
import SelectGroup from "../SelectGroup/SelectGroup"
import styles from './QuestionRow.module.scss'

interface QuestionRowProps {
    questionValue: string,
    questionOnChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    selectValue: string,
    selectOnChange: (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const QuestionRow = ({ questionValue, questionOnChange, selectValue, selectOnChange }: QuestionRowProps) => {
    return (
        <div className={styles.questionRow}>
            <InputGroup text="Question" placeholder="Question" value={questionValue} onChange={questionOnChange} />
            <SelectGroup label="Input type" value={selectValue} onChange={selectOnChange} />
        </div>
    )
}

export default QuestionRow
