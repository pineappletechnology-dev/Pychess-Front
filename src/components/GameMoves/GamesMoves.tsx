'use client'

import styles from './styles.module.css';

interface GameMovesProps {
    moves: string[];
}

export default function GameMoves({ moves }: GameMovesProps) {
    return (
        <div className={styles.movesContainer}>
            {moves.length === 0 ? (
                <p>Sem movimentos ainda...</p>
            ) : (
                moves.map((move, index) => (
                    <div key={index} className={styles.move}>
                        <p><strong>{index % 2 === 0 ? 'Brancas' : 'Pretas'}</strong>: {move}</p>
                    </div>
                ))
            )}
        </div>
    );
}
