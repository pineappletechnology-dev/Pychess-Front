import styles from './styles.module.css'

interface GenericButtonProps {
    text: string;
    type?: "button" | "submit" | "reset"; // Permite definir o tipo do botão
    onClick?: () => void;
}

export default function GenericButton({ text, type = "button", onClick }: GenericButtonProps) {
    return (
        <button type={type} className={styles.genericButton} onClick={onClick}>
            {text}
        </button>
    )
}