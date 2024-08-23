import Link from "next/link"
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
    text: string,
    href: string,
}

const Breadcrumb = ({ text, href }: BreadcrumbProps) => {
    return (<Link href={href} className={styles.breadcrumb}>{text}</Link>)
}

export default Breadcrumb
