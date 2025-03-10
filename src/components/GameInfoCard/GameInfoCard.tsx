import Image from "next/image";
import styles from './styles.module.css'
interface GicProps {
    username: string;
    result: string;
    time: string;
}

export default function GameInfoCard({username, result, time}: GicProps) {
    return (
        <button className={styles.buttonContainer}>
            <div className={styles.informationContainer}>
                <p>PyChess x {username}</p>
                <p>{result} • {time}</p>
            </div>
            <Image src={`/icons/arrow.svg`} alt="Profile" width={50} height={50} />
        </button>
    )
}