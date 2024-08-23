import Chatbot from "./components/chatbot"
import styles from './global.module.scss'

export default function Home() {
  return (
    <div>
      <a href="/authentication/signup">Sign up</a>
      <div className={styles.chatbotWrapper}>
        <Chatbot />
      </div>
    </div>
  );
}
