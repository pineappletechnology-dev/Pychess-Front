import '../../styles/globals.css'
import styles from './styles.module.css'
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import GameInfoCard from "@/components/GameInfoCard/GameInfoCard";
import GameButton from "@/components/GameButton/GameButton";
import InfoButton from "@/components/InfoButton/InfoButton";
import GamePreview from '@/components/GamePreview/GamePreview';

export default function Game() {
    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
                <GameButton></GameButton>
                <p>Última partida</p>
                <GameInfoCard username="Kasparov" result="Vitória" time="15 minutos atrás"></GameInfoCard>
                <p>Menu rápido</p>
                <div className={styles.quickMenu}>
                    <InfoButton iconName="history.svg" title="Histórico Geral" text="Ver partidas anteriores"></InfoButton>
                    <InfoButton iconName="info.svg" title="Sobre" text="Conheça sobre a plataforma"></InfoButton>
                    <InfoButton iconName="crown.svg" title="Ranking" text="Ver o ranking dos jogadores"></InfoButton>
                </div>
                <p>Últimos movimentos</p>
                <GamePreview></GamePreview>
            </div>
            <Footer iconName="icon-game.svg" text="Jogo"></Footer>
        </div>
    )
}