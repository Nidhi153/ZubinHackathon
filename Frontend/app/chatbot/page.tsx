import styles from './chatbotPage.module.scss'
import Chatbot from '../components/Chatbot/Chatbot'

/* This is a dummy page for showing the chatbot. */
const ChatbotPage = () => {
    return (
        <div className={styles.chatbotWrapper}>
            <Chatbot />
        </div>
    )
}

export default ChatbotPage
