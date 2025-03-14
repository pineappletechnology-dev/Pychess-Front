import Image from "next/image";
import styles from './styles.module.css'

interface InfoButtonProps {
    iconName: string;
    title: string;
    text: string;
    onClick?: () => void;
}

export default function InfoButton({iconName, title, text, onClick}: InfoButtonProps) {
    return(
        <div className={styles.ibContainer} onClick={onClick}>
            <Image src={`/icons/${iconName}`} alt="" width={25} height={25} />
            <div className={styles.ibTexts}>
                <p className={styles.ibTitle}>{title}</p>
                <p>{text}</p>
            </div>
        </div>
    )
}