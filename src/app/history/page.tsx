import '../../styles/globals.css'
import styles from './styles.module.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import GameInfoCard from '@/components/GameInfoCard/GameInfoCard'


export default function History() {

    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
            <GameInfoCard username="Nome da partida" result="Vitória" time="15 minutos"></GameInfoCard>
            </div>
            <Footer iconName='history.svg' text='Histórico'></Footer>
        </div>
    )
}