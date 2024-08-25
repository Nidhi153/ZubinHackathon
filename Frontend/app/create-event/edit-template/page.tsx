'use client'

import { useState, useEffect, useCallback } from "react"
import { Question } from "@/app/components/Dashboard/CreateEvent"
import QuestionRow from "@/app/components/QuestionRow/QuestionRow"
import Button from "@/app/components/Button/Button"
import styles from './editTemplate.module.scss'

const EditTemplate = () => {
    const [questions, setQuestions] = useState<Question[]>([])

    /* Fills in preset and final questions at the beginning */
    useEffect(() => {
        const questions = [
            { question: 'Name', inputType: 'short answer' },
            { question: 'Phone number', inputType: 'short answer' },
        ]

        setQuestions(questions)
    }, [])

    const handleAddQuestion = useCallback(() => {
        const newQuestions = [...questions]
        newQuestions.push({
            question: '',
            inputType: 'short answer'
        })
        setQuestions(newQuestions)
    }, [questions])

    return (
        <form className={styles.body}>
            <h1>Edit Question Template</h1>
            {questions.map((question, i) => (
                <QuestionRow
                    questionValue={question.question}
                    selectValue={question.inputType}
                    questionOnChange={(e) => {
                        const newFinalQuestions = [...questions]
                        newFinalQuestions[i] = {
                            question: e.target.value,
                            inputType: newFinalQuestions[i].inputType,
                        }
                        setQuestions(newFinalQuestions)
                    }}
                    selectOnChange={(e) => {
                        const newFinalQuestions = [...questions]
                        newFinalQuestions[i] = {
                            question: newFinalQuestions[i].question,
                            inputType: e.target.value,
                        }
                        setQuestions(newFinalQuestions)
                    }}
                />
            ))}
            <div className={styles.buttonWrapper}>
                <Button onClick={handleAddQuestion}>Add question</Button>
                <Button background="brown" type="submit">Confirm</Button>
            </div>
        </form>
    )
}

export default EditTemplate
