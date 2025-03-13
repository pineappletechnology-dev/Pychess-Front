import styles from './styles.module.css'

interface detailProps {
    labels: string[];
    values: string[];
    maxWidth: string;
    minWidth: string;
}

export default function GameDetailPanel({labels, values, maxWidth, minWidth}: detailProps) {
    return (
        <div className={styles.container} style={{maxWidth, minWidth}}>
            {labels.map((label, index) => (
                <div className={styles.content} key={index}>
                    <p>
                    {label}
                    </p>
                    <p>
                    {values[index]}
                    </p>
                </div>
            ))}
        </div>
    )
}