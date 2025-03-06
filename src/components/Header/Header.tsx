import styles from "./styles.module.css"

export default function Header() {
    return (
        <div className={styles.header}>
            <p className={styles.headerLabel} >PyChess</p>
        </div>
    )
}