import styles from './Button.module.scss'

interface ButtonProps {
    children: string,
    background?: 'blue' | 'brown' | 'error',
    onClick?: () => void,
}

const Button = ({ children, background = 'blue', onClick }: ButtonProps) => {
    return (
        <button onClick={(e) => {
            if (onClick) {
                onClick()
            }
        }} className={[
            styles.button,
            background === 'brown' ? styles.buttonBrown : (background === 'error' ? styles.buttonError : ''),
        ].join(' ')}>{children}</button>
    )
}

export default Button
