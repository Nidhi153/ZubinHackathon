import styles from './Message.module.scss'

interface MessageProps {
    from: 'user' | 'bot',
    text: string,
}

const Message = ({ from, text }: MessageProps) => {
    return (
        <div className={[
            styles.wrapper,
            from === 'user' ? styles.userWrapper : '',
        ].join(' ')}>
            <div className={[
                styles.message,
                from === 'user' ? styles.userMessage : styles.botMessage,
            ].join(' ')}>
                <div>{text}</div>
            </div>
        </div>
    )
}

export default Message
