import Image from "next/image";
import styles from './styles.module.css'

interface FooterInfo {
    iconName: string;
    text: string;
}

export default function Footer({iconName, text}: FooterInfo) {
    return(
        <footer className={styles.footer}>
            <Image src={`/icons/${iconName}`} alt="Profile" width={35} height={35} />
            <p>{text}</p>
        </footer>
    )
}