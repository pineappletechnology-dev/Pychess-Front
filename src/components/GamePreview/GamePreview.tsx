'use client'

import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import styles from './styles.module.css';
import GameMoves from '../GameMoves/GamesMoves';
import EvaluationBar from '../EvaluationBar/EvaluationBar';
import { io, Socket } from 'socket.io-client';

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
    const SOCKET_URL = API_URL?.replace(/^http/, 'ws');

    useEffect(() => {
        const socket: Socket = io(SOCKET_URL || '', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Conectado ao WebSocket!');
        });

        socket.on('connect_error', (err) => {
            console.error('Erro de conexão WebSocket:', err);
        });

        // Escuta por eventos específicos enviados do servidor
        socket.on('some_event', (data) => {
            console.log('Dados recebidos do servidor:', data);
        });

        if (hasOngoingGame) {
            fetchData();

            // Escuta o evento socket
            socket.on('board_updated', () => {
                console.log("Evento board_updated recebido! Atualizando dados...");
                fetchData();
            });
        }

        // Cleanup
        return () => {
            socket.disconnect();
        };
    }, [hasOngoingGame, API_URL]);

    const fetchData = async () => {
        try {
            const boardRes = await fetch(`${API_URL}/game_board/`);
            if (!boardRes.ok) throw new Error("Erro ao carregar o tabuleiro.");
            const boardData = await boardRes.json();
            setFen(boardData.fen);

            const movesRes = await fetch(`${API_URL}/game_moves/`);
            if (!movesRes.ok) throw new Error("Erro ao carregar os movimentos.");
            const movesData = await movesRes.json();
            setGameMoves(movesData.moves);

            const evaluationRes = await fetch(`${API_URL}/evaluate_position/`);
            if (!evaluationRes.ok) throw new Error("Erro ao carregar avaliação.");
            const evaluationData = await evaluationRes.json();
            setWinProbability({
                white: evaluationData.win_probability_white,
                black: evaluationData.win_probability_black
            });

        } catch (err) {
            console.error(err);
            setError("Erro ao carregar os dados.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='flex mt-4 justify-center py-24 border border-gray-400 rounded-lg border-dashed'>
                <p className='text-gray-500'>Nenhuma partida encontrada
                </p>
            </div>
        );
    }

    if (error) {
        return <div className={styles.container}><p>{error}</p></div>;
    }

    return (
        <div className='bg-white relative flex flex-col justify-center p-8 mt-4 rounded-xl border border-gray-300'>
            <div className='bg-gray-50 p-4 w-full h-full rounded-md border border-gray-300'>
                <div className='flex justify-center items-center gap-6'>
                    <div className='absolute left-14'>
                        <EvaluationBar
                            winProbabilityWhite={winProbability.white}
                            winProbabilityBlack={winProbability.black}
                        />
                    </div>

                    <div className='border border-slate-300'>
                        <Chessboard position={fen} boardWidth={400} arePiecesDraggable={false} />
                    </div>
                </div>
            </div>

            <p className='text-lg font-medium mt-8'>Histórico de Movimentos</p>
            <GameMoves moves={gameMoves} />

            <button className='bg-gray-800 text-white mt-6 px-4 py-3 rounded-md cursor-pointer'>
                Ver Todos os Movimentos
            </button>
        </div>
    );
}
