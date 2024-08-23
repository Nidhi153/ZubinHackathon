import styles from './Button.module.scss'

interface ButtonProps {
    children: string,
    background?: 'blue' | 'brown',
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
            background === 'brown' ? styles.buttonBrown : '',
        ].join(' ')}>{children}</button>
    )
}

export default Button
