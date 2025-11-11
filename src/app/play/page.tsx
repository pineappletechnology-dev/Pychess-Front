'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

import '../../styles/globals.css';
import styles from './styles.module.css';

export default function GameboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState('start');
    const [gameId, setGameId] = useState<string | null>(null);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [boardTheme, setBoardTheme] = useState<'light' | 'dark'>('light');
    const [orientation, setOrientation] = useState<'white' | 'black'>('white');
    const [showCoordinates, setShowCoordinates] = useState(true);
    const [boardSize, setBoardSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [lastMoveSquares, setLastMoveSquares] = useState<{ from: string; to: string } | null>(null);
    const [stockfishMove, setStockfishMove] = useState<{ from: string; to: string } | null>(null);
    const [gameStatus, setGameStatus] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    interface MoveData {
        fen: string;
        move: string;
        isPlayer: number;
    }

    const moveArrayRef = useRef<MoveData[]>([]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        if (!gameId) {
            setGameId(crypto.randomUUID());
        }

        const id = localStorage.getItem('user_id');
        setUserId(id);

        setLoading(false);
    }, [gameId, router]);


    const finishGame = async (winner: 'player' | 'ai') => {
        const res = await fetch(`${API_URL}/finish_game/?user_id=${userId}&winner=${winner}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            console.log("✅ Partida encerrada com sucesso!");
        } else {
            const err = await res.text();
            console.error("❌ Erro ao encerrar partida:", err);
        }
    };


    const registerGame = async (status: string) => {
        console.log("Enviando jogo para o banco...");

        try {
            const response = await fetch(`${API_URL}/register_move/?user_id=${userId}&winner=${status}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(moveArrayRef.current),
            });


            const result = await response.json();
            console.log("Jogo registrado:", result);
        } catch (error) {
            console.error("Erro ao registrar o jogo:", error);
        }
    };



    const getBoardWidth = () => {
        if (typeof window === 'undefined') return 800; // fallback pro SSR

        const screenWidth = window.innerWidth;

        if (screenWidth < 500) return 320;          
        if (screenWidth < 800) return 500;          
        if (screenWidth < 1200) return 650;         
        return 800;                                
    };

    const toggleTheme = () => setBoardTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    const toggleOrientation = () => setOrientation(prev => (prev === 'white' ? 'black' : 'white'));
    const toggleCoordinates = () => setShowCoordinates(prev => !prev);

    // Cores para os temas
    const lightThemeLightSquare = '#f0d9b5';
    const lightThemeDarkSquare = '#b58863';
    const darkThemeLightSquare = '#6c7a89';
    const darkThemeDarkSquare = '#2f3e46';

    const handleMove = async (sourceSquare: string, targetSquare: string) => {
        if (!gameId) return false;

        const move = {
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        };

        const gameCopy = new Chess(game.fen());
        console.log(move);
        let result = undefined;
        try {
            result = gameCopy.move(move);
        }
        catch {
            result = undefined;
        }

        if(result) {
            // apenas loga a FEN após o movimento
            try {
                console.log('FEN após o movimento:', gameCopy.fen());
                moveArrayRef.current.push({fen: `${gameCopy.fen()}`, isPlayer: 1, move: `${sourceSquare}${targetSquare}`});
            } catch (e) {
                console.log('Não foi possível obter a FEN do jogo:', e);
            }
        }

        console.log(moveArrayRef);

        // if (!result) {
        //     setStatusMsg('Movimento inválido! Tente novamente.');
        //     return false;
        // }

        setGame(gameCopy);
        setFen(gameCopy.fen());
        setStatusMsg(null);
        setLastMoveSquares({ from: sourceSquare, to: targetSquare });
        setStockfishMove(null);
        setGameStatus(null);

        try {
            const response = await fetch(`${API_URL}/play_autonomous_game/?game_id=${gameId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ move: `${sourceSquare}${targetSquare}` }),
            });

            const data = await response.json();

            if (data.error) {
                setStatusMsg(data.error);
                return false;
            }

            if (data.message) {
                setGameStatus(data.message);
            }
            console.log(`data`, data)

            if(data.status === 'fim') {
                await registerGame();

                if(data.winner === 'player') {
                    await finishGame('player');
                } 
                else if(data.winner === 'ai') {
                    await finishGame('ai');
                }
            }

            if (data.fen) {
                const updatedGame = new Chess(data.fen);
                setGame(updatedGame);
                setFen(data.fen);
            }

            if (data.stockfish_move) {
                setStockfishMove({
                    from: data.stockfish_move.slice(0, 2),
                    to: data.stockfish_move.slice(2, 4),
                });
            } else {
                setStockfishMove(null);
            }
        } catch (error) {
            console.error('Erro ao enviar jogada:', error);
            setStatusMsg('Erro na comunicação com o servidor.');
        }

        // apenas loga a FEN após o movimento
        try {
            console.log('FEN após o movimento:', gameCopy.fen());
            moveArrayRef.current.push({fen: `${gameCopy.fen()}`, isPlayer: 0, move: `${sourceSquare}${targetSquare}`});
        } catch (e) {
            console.log('Não foi possível obter a FEN do jogo:', e);
        }

        console.log(moveArrayRef);
        return true;
    };

    if (loading) {
        return (
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.container}
        style={
            { height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
        } >
            {/* <button
                onClick={() => setShowSettings(prev => !prev)}
                className={styles.button}
                style={{ marginBottom: '1rem' }}
            >
                {showSettings ? 'Ocultar Configurações ▲' : 'Mostrar Configurações ▼'}
            </button> */}

            {showSettings && (
                <div className={styles.settingsContainer}>
                    <h3 className={styles.settingsTitle}>⚙️ Configurações do Tabuleiro</h3>

                    <button onClick={toggleTheme} className={styles.button}>
                        Tema: {boardTheme === 'light' ? 'Claro' : 'Escuro'}
                    </button>

                    <button onClick={toggleOrientation} className={styles.button}>
                        Orientação: {orientation === 'white' ? 'Branco' : 'Preto'}
                    </button>

                    <button onClick={toggleCoordinates} className={styles.button}>
                        Coordenadas: {showCoordinates ? 'Ativadas' : 'Ocultas'}
                    </button>

                    <div style={{ marginTop: '10px' }}>
                        <label>
                            <strong>Tamanho:</strong>
                        </label>
                        <select
                            value={boardSize}
                            onChange={e => setBoardSize(e.target.value as 'small' | 'medium' | 'large')}
                            className={styles.select}
                        >
                            <option value="small">Pequeno</option>
                            <option value="medium">Médio</option>
                            <option value="large">Grande</option>
                        </select>
                    </div>
                </div>
            )}

            {gameStatus && (
                <div
                    style={{
                        marginBottom: '1rem',
                        padding: '12px',
                        backgroundColor: '#d1ecf1',
                        border: '1px solid #bee5eb',
                        borderRadius: '6px',
                        color: '#0c5460',
                        fontWeight: 'bold',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                >
                    {gameStatus}
                </div>
            )}

            {statusMsg && (
                <div
                    style={{
                        marginBottom: '1rem',
                        padding: '10px 16px',
                        backgroundColor: '#fff3cd',
                        border: '1px solid #ffeeba',
                        borderRadius: '8px',
                        color: '#856404',
                        fontWeight: 'bold',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                >
                    {statusMsg}
                </div>
            )}

            <div
                className={styles.content}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent:'center',
                    gap: '1rem'
                 }}
            >
                <h2>Jogo contra Stockfish</h2>
                <Chessboard
                    position={fen}
                    boardWidth={getBoardWidth()}
                    onPieceDrop={handleMove}
                    boardOrientation={orientation}
                    showBoardCoordinates={showCoordinates}
                    boardLightSquareColor={boardTheme === 'light' ? lightThemeLightSquare : darkThemeLightSquare}
                    boardDarkSquareColor={boardTheme === 'light' ? lightThemeDarkSquare : darkThemeDarkSquare}
                    customBoardStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        display: 'block',
                        margin: '0 auto', // força o centro
                    }}
                    customSquareStyles={{
                        [lastMoveSquares?.from || '']: { backgroundColor: 'rgba(255, 255, 0, 0.6)' },
                        [lastMoveSquares?.to || '']: { backgroundColor: 'rgba(255, 255, 0, 0.6)' },
                    }}
                    customArrows={
                        stockfishMove
                            ? [{ from: stockfishMove.from, to: stockfishMove.to, color: 'rgba(0, 255, 0, 0.6)' }]
                            : []
                    }
                />
            </div>
            <button
                onClick={() => registerGame("PLAYER")}
            >
            Testar Registro de Vitória do Player
            </button>

            <button
                onClick={() => registerGame("AI")}
            >
            Testar Registro de Vitória da IA
            </button>

        </div>
    );
}
