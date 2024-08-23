import styles from './Button.module.scss'

interface ButtonProps {
    children: string,
    background?: 'blue' | 'brown',
}

const Button = ({ children, background = 'blue' }: ButtonProps) => {
    return (
        <div className={[
            styles.button,
            background === 'brown' ? styles.buttonBrown : '',
        ].join(' ')}>{children}</div>
    )
}

export default Button
