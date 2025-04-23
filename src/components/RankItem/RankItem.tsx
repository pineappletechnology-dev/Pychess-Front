import styles from './styles.module.css'

interface rankItem {
    name: string;
    victoryCount: string;
}

export default function RankItem({name, victoryCount}: rankItem) {
    return (
        <div className={styles.rankContainer}>
            <p className={styles.rankName}>{name}</p>
            <p className={styles.rankText}>{victoryCount}</p>
        </div>
    )

}