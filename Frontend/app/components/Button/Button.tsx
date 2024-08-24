import styles from './Button.module.scss'

interface ButtonProps {
    children: string,
    background?: 'blue' | 'brown' | 'error',
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset',
}

const Button = ({ children, background = 'blue', onClick = () => { }, type = 'button' }: ButtonProps) => {
    return (
        <button onClick={(e) => { onClick() }} type={type}
            className={[
                styles.button,
                background === 'brown' ? styles.buttonBrown : (background === 'error' ? styles.buttonError : ''),
            ].join(' ')}>{children}</button>
    )
}

export default Button
