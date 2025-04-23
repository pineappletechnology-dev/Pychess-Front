import Image from "next/image";
import styles from './styles.module.css'
interface GicProps {
    username: string;
    result: string;
    time: string;
    onClick?: () => void;
}

export default function GameInfoCard({ username, result, time, onClick }: GicProps) {
    return (
        <button className={styles.buttonContainer} onClick={onClick}>
            <div className={styles.informationContainer}>
                <p>PyChess x {username}</p>
                <p>{result} • {time}</p>
            </div>
            <Image src={`/icons/arrow.svg`} alt="Profile" width={50} height={50} />
        </button>
    )
}