'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

import '../../../styles/globals.css'
import styles from './styles.module.css'
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import InfoButton from "@/components/InfoButton/InfoButton";

export default function HistoryPage() {
    const { id } = useParams(); // recebe o ID da URL
    const [moves, setMoves] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [fen, setFen] = useState("start");

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchMoves = async () => {
            const res = await fetch(`${API_URL}/game_moves/${id}`);
            const data = await res.json();
            setMoves(data.moves);
        };
        fetchMoves();
    }, [id]);

    const applyMovesUntil = (index: number) => {
        const chess = new Chess();
        for (let i = 0; i <= index; i++) {
            if (moves[i]) chess.move(moves[i]);
        }
        setFen(chess.fen());
    };

    useEffect(() => {
        applyMovesUntil(currentMoveIndex);
    }, [currentMoveIndex, moves]);

    const goNext = () => {
        if (currentMoveIndex < moves.length - 1) setCurrentMoveIndex(i => i + 1);
    };

    const goBack = () => {
        if (currentMoveIndex > 0) {
            setCurrentMoveIndex(i => i - 1);
        } else {
            setCurrentMoveIndex(-1); // Reseta para a posição inicial do xadrez
        }
    };

    return (
        <div className={styles.container}>
            <Header></Header>
            <h2 className={styles.title}>Jogo #{id}</h2>

            <div className={styles.boardWrapper}>
                <Chessboard position={fen} boardWidth={400} />
            </div>

            <div className={styles.progressBarWrapper}>
                <div className={styles.progressBarBackground}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${((currentMoveIndex + 1) / moves.length) * 100}%` }}
                    ></div>
                </div>
                <span className={styles.progressText}>
                    {currentMoveIndex + 1} / {moves.length}
                </span>
            </div>

            <div className={styles.movesList}>
                <InfoButton iconName="info.svg" title="Resultado" text="Vitoria"></InfoButton>
                <InfoButton iconName="info.svg" title="Tempo de jogo" text="15 minutos"></InfoButton>
            </div>

            <div className={styles.buttons}>
                <button onClick={goBack}>Anterior</button>
                <span className={styles.currentMove}>{currentMoveIndex >= 0 ? moves[currentMoveIndex] : ""}</span>
                <button onClick={goNext}>Próxima</button>
            </div>

            <div className={styles.movesList}>
                {moves.map((move, index) => (
                    <span
                        key={index}
                        className={styles.moveItem}
                        style={{ fontWeight: index === currentMoveIndex ? 'bold' : 'normal' }}
                    >
                        {index + 1}. {move}
                    </span>
                ))}
            </div>
            <Footer iconName="icon-game.svg" text="Jogo"></Footer>
        </div>
    );
}
