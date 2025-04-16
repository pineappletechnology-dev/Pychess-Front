'use client'

import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import styles from './styles.module.css';

interface GamePreviewProps {
    hasOngoingGame?: boolean;
}

export default function GamePreview({ hasOngoingGame = false }: GamePreviewProps) {
    const [fen, setFen] = useState<string>('start');
    const [error, setError] = useState<string | null>(null);
    const [boardWidth, setBoardWidth] = useState(400);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const updateBoardSize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 480) {
                setBoardWidth(screenWidth - 40);
            } else if (screenWidth < 768) {
                setBoardWidth(400);
            } else {
                setBoardWidth(500);
            }
        };

        updateBoardSize();
        window.addEventListener('resize', updateBoardSize);

        return () => window.removeEventListener('resize', updateBoardSize);
    }, []);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchBoard = () => {
            fetch(`${API_URL}/game_board/`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Erro ao buscar o tabuleiro.");
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.fen) {
                        setFen(data.fen); // ← atualiza posição
                    }
                })
                .catch(err => {
                    console.error(err);
                    setError("Erro ao carregar o tabuleiro.");
                });
        };

        if (hasOngoingGame) {
            fetchBoard(); // primeira chamada
            intervalId = setInterval(fetchBoard, 2000); // polling
        }

        return () => clearInterval(intervalId);
    }, [hasOngoingGame, API_URL]);

    if (!hasOngoingGame) {
        return <div className={styles.container}><p>Nenhum jogo em andamento</p></div>;
    }

    if (error) {
        return <div className={styles.container}><p>{error}</p></div>;
    }

    return (
        <div className={styles.container}>
            <Chessboard position={fen} boardWidth={boardWidth} arePiecesDraggable={false} />
        </div>
    );
}
