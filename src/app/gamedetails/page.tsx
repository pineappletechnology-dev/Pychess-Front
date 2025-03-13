import Header from '@/components/Header/Header';
import '../../styles/globals.css'
import styles from './styles.module.css'
import GameDetailPanel from "@/components/GameDetailPanel/GameDetailPanel";
import Footer from '@/components/Footer/Footer';

export default function GameDetails() {
    return (
        <div className={styles.container}>
            <Header></Header>
            <div className={styles.content}>
                <p>Informações do jogador</p>
                <GameDetailPanel labels={['Número de partidas', 'Vitórias', 'Derrotas', 'Empates', 'Rating']} values={['10','1','9','0','102']} maxWidth='90%' minWidth='90%'></GameDetailPanel>

                <p>Outros dados</p>
                <div className={styles.gameData}>
                <GameDetailPanel labels={['Taxa de vitória']} values={['10%']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Jogadas espetaculares']} values={['2']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Mates']} values={['1']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Taxa de derrota']} values={['90%']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Erros']} values={['297']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Mates sofridos']} values={['9']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Vitórias (fácil)']} values={['1']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Vitórias (médio)']} values={['0']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Vitórias (difícil)']} values={['0']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Derrotas (fácil)']} values={['3']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Derrotas (médio)']} values={['2']} maxWidth='30%' minWidth='30%'></GameDetailPanel>
                <GameDetailPanel labels={['Derrotas (difícil)']} values={['4']} maxWidth='30%' minWidth='30%'></GameDetailPanel>

                </div>
            </div>
            <Footer iconName='person.svg' text='Perfil'></Footer>
        </div>
    )
}