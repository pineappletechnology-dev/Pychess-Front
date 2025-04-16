'use client'

import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import styles from './styles.module.css';
import GameMoves from '../GameMoves/GamesMoves';
import EvaluationBar from '../EvaluationBar/EvaluationBar';

interface GamePreviewProps {
    hasOngoingGame?: boolean;
}

export default function GamePreview({ hasOngoingGame = false }: GamePreviewProps) {
    const [fen, setFen] = useState<string>('start');
    const [gameMoves, setGameMoves] = useState([]);
    const [winProbability, setWinProbability] = useState({ white: 0, black: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Busca o estado atual do tabuleiro
                const boardRes = await fetch(`${API_URL}/game_board/`);
                if (!boardRes.ok) throw new Error("Erro ao carregar o tabuleiro.");
                const boardData = await boardRes.json();
                setFen(boardData.fen);

                // Busca os movimentos
                const movesRes = await fetch(`${API_URL}/game_moves/`);
                if (!movesRes.ok) throw new Error("Erro ao carregar os movimentos.");
                const movesData = await movesRes.json();
                setGameMoves(movesData.moves);

                // Busca a probabilidade de vitória
                const evaluationRes = await fetch(`${API_URL}/evaluate_position/`);
                if (!evaluationRes.ok) throw new Error("Erro ao carregar avaliação.");
                const evaluationData = await evaluationRes.json();
                setWinProbability({ white: evaluationData.win_probability_white, black: evaluationData.win_probability_black });

            } catch (err) {
                console.error(err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        if (hasOngoingGame) {
            fetchData();
            const intervalId = setInterval(fetchData, 2000); // polling a cada 2 segundos
            return () => clearInterval(intervalId);  // Limpar o intervalo quando o componente for desmontado
        }
    }, [hasOngoingGame, API_URL]);

    if (loading) {
        return <div className={styles.container}><p>Carregando...</p></div>;
    }

    if (error) {
        return <div className={styles.container}><p>{error}</p></div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.boardContainer}>
                <Chessboard position={fen} boardWidth={400} arePiecesDraggable={false} />
                <EvaluationBar
                    winProbabilityWhite={winProbability.white}
                    winProbabilityBlack={winProbability.black}
                />
            </div>
            <div className={styles.movesContainer}>
                <GameMoves moves={gameMoves} />
            </div>
        </div>
    );

}
