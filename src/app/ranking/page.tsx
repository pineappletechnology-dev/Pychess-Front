import '../../styles/globals.css'
import Header from '@/components/Header/Header'
import styles from './styles.module.css'
import Footer from '@/components/Footer/Footer'
import RankItem from '@/components/RankItem/RankItem'
import Image from 'next/image'

export default function Ranking() {
    return(
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
                <div className={styles.bestContainer}>
                    <div className={styles.bestName}>
                        <p className={styles.bestIcon}><Image src={`/icons/crown.svg`} alt="Profile" width={50} height={50} /></p>
                        <p className={styles.bestTitle}>Nome do top 1</p>
                    </div>
                    <div className={styles.bestDesc}>
                        <p className={styles.bestText}>10 trilhões de vitórias</p>
                    </div>
                </div>

                <p>Top 5</p>
                <div className={styles.topPlayersContainer}>
                    <RankItem name='Fulano da Silva' victoryCount='1 milhão de vitórias'></RankItem>
                    <RankItem name='Fulano da Silva' victoryCount='1 milhão de vitórias'></RankItem>
                    <RankItem name='Fulano da Silva' victoryCount='1 milhão de vitórias'></RankItem>
                </div>

            </div>
            <Footer iconName='crown.svg' text='Ranking'></Footer>
        </div>
    )
}