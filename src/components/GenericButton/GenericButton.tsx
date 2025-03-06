import styles from './styles.module.css'

interface GenericButtonProps {
    text: string;
    onClick?: () => void;
}

export default function GenericButton({text, onClick}: GenericButtonProps) {
    return (
        <div className={styles.genericButton} onClick={onClick}>
            {text}
        </div>
    )
}